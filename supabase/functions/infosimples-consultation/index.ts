import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConsultationRequest {
  type: string;
  query: string;
  consultationType?: string; // 'simples' or 'completo'
  state?: string; // For vehicle consultations (SP, RJ, MG, PR)
  municipio?: string; // For property consultations
  uf?: string; // For property consultations
  cnpj?: string; // For RJ vehicle consultations
  cpf?: string; // For RJ vehicle consultations
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace("Bearer ", "")
    );

    if (authError || !user) {
      throw new Error("Usuário não autenticado");
    }

    const consultationData: ConsultationRequest = await req.json();
    const { type, query, consultationType = 'completo', state = 'SP', municipio, uf, cnpj, cpf } = consultationData;

    // Get InfoSimples token
    const infosimplesToken = Deno.env.get("INFOSIMPLES_TOKEN");
    if (!infosimplesToken) {
      throw new Error("Token InfoSimples não configurado");
    }

    // Service client for database operations
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Determine consultation type and cost
    let consultationTypeKey = type;
    let costCents = 0;
    let endpoint = '';

    // Get consultation type and pricing
    const { data: consultationTypes } = await supabaseService
      .from('consultation_types')
      .select('name, price_cents')
      .eq('is_active', true);

    if (type === 'cpf') {
      consultationTypeKey = consultationType === 'simples' ? 'cpf_simples' : 'cpf_completo';
      endpoint = 'https://api.infosimples.com/api/v2/consulta/cpf';
    } else if (type === 'cnpj') {
      consultationTypeKey = consultationType === 'simples' ? 'cnpj_simples' : 'cnpj_completo';
      endpoint = 'https://api.infosimples.com/api/v2/consulta/cnpj';
    } else if (type === 'veiculo') {
      consultationTypeKey = consultationType === 'basico' ? 'veiculo_basico' : 'veiculo_master';
      endpoint = `https://api.infosimples.com/api/v2/detran/${state.toLowerCase()}/veiculo`;
    } else if (type === 'imoveis') {
      consultationTypeKey = 'imoveis';
      endpoint = 'https://api.infosimples.com/api/v2/consulta/imoveis';
    } else if (type === 'protesto') {
      consultationTypeKey = 'protesto_nacional';
      endpoint = 'https://api.infosimples.com/api/v2/consulta/protesto';
    } else if (type === 'detran_mg_multas') {
      consultationTypeKey = 'detran_mg_multas';
      endpoint = 'https://api.infosimples.com/api/v2/consultas/detran/mg/multas-extrato';
    } else if (type === 'sefaz_sp_debitos') {
      consultationTypeKey = 'sefaz_sp_debitos';
      endpoint = 'https://api.infosimples.com/api/v2/consultas/sefaz/sp/debitos-veiculo';
    } else if (type === 'detran_rj_multas') {
      consultationTypeKey = 'detran_rj_multas';
      endpoint = 'https://api.infosimples.com/api/v2/consultas/detran/rj/multas-guias';
    } else if (type === 'sncr_imoveis') {
      consultationTypeKey = 'sncr_imoveis';
      endpoint = 'https://api.infosimples.com/api/v2/consultas/sncr/imoveis';
    }

    // Find the cost for this consultation type
    const typeData = consultationTypes?.find(ct => ct.name === consultationTypeKey);
    if (!typeData) {
      throw new Error(`Tipo de consulta não encontrado: ${consultationTypeKey}`);
    }
    costCents = typeData.price_cents;

    // Check user credits
    const { data: userCredits } = await supabaseService
      .from('user_credits')
      .select('balance_cents')
      .eq('user_id', user.id)
      .single();

    if (!userCredits || userCredits.balance_cents < costCents) {
      throw new Error("Créditos insuficientes para realizar esta consulta");
    }

    // Prepare API request body
    const requestBody: any = {
      token: infosimplesToken,
      documento: query
    };

    // For vehicle consultations, add additional fields
    if (type === 'veiculo') {
      const [placa, renavam] = query.split('|'); // Expecting "ABC1234|123456789"
      requestBody.placa = placa;
      if (renavam) {
        requestBody.renavam = renavam;
      }
    } else if (type === 'detran_mg_multas' || type === 'sefaz_sp_debitos') {
      const [placa, renavam] = query.split('|'); // Expecting "ABC1234|123456789"
      requestBody.placa = placa;
      if (renavam) {
        requestBody.renavam = renavam;
      }
      delete requestBody.documento; // Remove documento field for these consultations
    } else if (type === 'detran_rj_multas') {
      const [renavam, cpfOrCnpj] = query.split('|'); // Expecting "123456789|12345678901"
      requestBody.renavam = renavam;
      if (cpfOrCnpj) {
        if (cpfOrCnpj.length === 11) {
          requestBody.cpf = cpfOrCnpj;
        } else if (cpfOrCnpj.length === 14) {
          requestBody.cnpj = cpfOrCnpj;
        }
      }
      delete requestBody.documento; // Remove documento field for this consultation
    } else if (type === 'sncr_imoveis') {
      requestBody.uf = uf || 'SP';
      requestBody.municipio = municipio || 'SAO PAULO';
      delete requestBody.documento; // Remove documento field for this consultation
    }

    // Make API call to InfoSimples
    console.log(`Making request to: ${endpoint}`);
    console.log(`Request body:`, requestBody);

    const apiResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const apiData = await apiResponse.json();
    console.log(`API Response:`, apiData);

    if (!apiResponse.ok) {
      throw new Error(`Erro na API InfoSimples: ${apiData.message || 'Falha na consulta'}`);
    }

    // Process response based on consultation type
    let processedData = apiData;

    // For simple consultations, hide creditor information
    if (consultationType === 'simples' && (type === 'cpf' || type === 'cnpj')) {
      processedData = hideCreditorInfo(apiData);
    }

    // For basic vehicle consultations, limit data
    if (type === 'veiculo' && consultationType === 'basico') {
      processedData = limitVehicleData(apiData);
    }

    // Add contact phone numbers for creditors in complete consultations
    if (consultationType === 'completo' && (type === 'cpf' || type === 'cnpj')) {
      processedData = addCreditorPhones(apiData);
    }

    // Process new consultation types
    if (['detran_mg_multas', 'sefaz_sp_debitos', 'detran_rj_multas', 'sncr_imoveis'].includes(type)) {
      processedData = processSpecializedConsultation(apiData, type);
    }

    // Deduct credits
    const { error: deductError } = await supabaseService.rpc('deduct_user_credits', {
      user_id: user.id,
      amount_cents: costCents,
      description: `Consulta ${type.toUpperCase()} ${consultationType}`
    });

    if (deductError) {
      throw new Error(`Erro ao deduzir créditos: ${deductError.message}`);
    }

    // Log consultation
    const { error: logError } = await supabaseService.rpc('log_api_consultation', {
      p_user_id: user.id,
      p_api_name: `InfoSimples ${type.toUpperCase()}`,
      p_endpoint: endpoint,
      p_request_payload: requestBody,
      p_response_payload: processedData,
      p_status_code: apiResponse.status
    });

    if (logError) {
      console.error('Error logging consultation:', logError);
    }

    // Record the consultation
    await supabaseService
      .from('consultations')
      .insert({
        user_id: user.id,
        consultation_type: consultationTypeKey,
        query_data: { query, type, consultationType, state },
        result_data: processedData,
        cost_cents: costCents,
        status: 'COMPLETED'
      });

    return new Response(JSON.stringify({
      success: true,
      data: processedData,
      credits_used: costCents,
      consultation_type: consultationTypeKey
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Consultation error:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || "Falha ao realizar consulta"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

// Helper function to hide creditor information for simple consultations
function hideCreditorInfo(data: any): any {
  if (!data) return data;

  const hiddenData = { ...data };
  
  // Remove or mask creditor information
  if (hiddenData.dividas) {
    hiddenData.dividas = hiddenData.dividas.map((divida: any) => ({
      ...divida,
      credor: 'INFORMAÇÃO RESTRITA - UPGRADE PARA CONSULTA COMPLETA',
      telefone_credor: undefined
    }));
  }

  if (hiddenData.protestos) {
    hiddenData.protestos = hiddenData.protestos.map((protesto: any) => ({
      ...protesto,
      credor: 'INFORMAÇÃO RESTRITA - UPGRADE PARA CONSULTA COMPLETA',
      telefone_credor: undefined
    }));
  }

  return hiddenData;
}

// Helper function to limit vehicle data for basic consultations
function limitVehicleData(data: any): any {
  if (!data) return data;

  return {
    placa: data.placa,
    renavam: data.renavam,
    modelo: data.modelo,
    ano: data.ano,
    multas: data.multas,
    crlv: data.crlv,
    // Hide sinistros and IPVA data
    sinistros: undefined,
    debito_ipva: undefined,
    historico_completo: undefined
  };
}

// Helper function to add creditor phone numbers
function addCreditorPhones(data: any): any {
  if (!data) return data;

  const dataWithPhones = { ...data };
  
  // Mock phone numbers for creditors (in real implementation, fetch from database)
  const mockCreditorPhones: Record<string, string> = {
    'BANCO BRADESCO': '(11) 4004-2345',
    'CAIXA ECONOMICA FEDERAL': '(11) 4004-0104',
    'BANCO DO BRASIL': '(11) 4004-0001',
    'BANCO ITAU': '(11) 4004-4828',
    'BANCO SANTANDER': '(11) 4004-3535',
    'SERASA': '(11) 4004-2525',
    'SPC BRASIL': '(11) 3003-3062',
    'SCPC': '(11) 3003-3062'
  };

  if (dataWithPhones.dividas) {
    dataWithPhones.dividas = dataWithPhones.dividas.map((divida: any) => {
      const credorNome = divida.credor?.toUpperCase() || '';
      const telefone = Object.keys(mockCreditorPhones).find(key => 
        credorNome.includes(key)
      );
      
      return {
        ...divida,
        telefone_credor: telefone ? mockCreditorPhones[telefone] : '(11) 3003-3062'
      };
    });
  }

  return dataWithPhones;
}

// Helper function to process specialized consultations
function processSpecializedConsultation(data: any, type: string): any {
  if (!data || !data.data) return data;

  const processedData = { ...data };
  
  // Add formatted information for each consultation type
  if (type === 'detran_mg_multas') {
    processedData.consultation_type = 'Multas DETRAN MG';
    processedData.formatted_data = data.data.map((item: any) => ({
      ...item,
      tipo_consulta: 'Multas e Infrações - MG',
      valor_formatado: item.valor || 'N/A',
      data_formatada: item.data_infracao || 'N/A'
    }));
  } else if (type === 'sefaz_sp_debitos') {
    processedData.consultation_type = 'Débitos SEFAZ SP';
    processedData.formatted_data = data.data.map((item: any) => ({
      ...item,
      tipo_consulta: 'Débitos Veiculares - SP',
      valor_total_formatado: item.valor_total_debitos || 'N/A',
      ipva_formatado: item.ipva?.valor || 'N/A'
    }));
  } else if (type === 'detran_rj_multas') {
    processedData.consultation_type = 'Multas DETRAN RJ';
    processedData.formatted_data = data.data.map((item: any) => ({
      ...item,
      tipo_consulta: 'Multas e Guias - RJ',
      valor_formatado: item.valor || 'N/A',
      vencimento_formatado: item.vencimento || 'N/A'
    }));
  } else if (type === 'sncr_imoveis') {
    processedData.consultation_type = 'Consulta SNCR Imóveis';
    processedData.formatted_data = data.data.map((item: any) => ({
      ...item,
      tipo_consulta: 'Sistema Nacional de Cadastro Rural',
      status_csv: item.conseguiu_emitir_csv ? 'Disponível' : 'Indisponível'
    }));
  }

  return processedData;
}