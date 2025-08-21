import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.55.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { type, query, userId } = await req.json();

    console.log('Received consultation request:', { type, query, userId });

    // Validate user authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Mock API responses for different consultation types
    let result = {};
    
    switch (type) {
      case 'cpf':
        result = {
          nome: "João da Silva Santos",
          cpf: query,
          situacao: "Ativo",
          nascimento: "15/03/1985",
          score: 650,
          renda_estimada: "R$ 4.500,00",
          telefones: ["(11) 99999-9999", "(11) 3333-4444"],
          emails: ["joao.silva@email.com"],
          enderecos: [{
            logradouro: "Rua das Flores, 123",
            bairro: "Centro",
            cidade: "São Paulo",
            uf: "SP",
            cep: "01234-567"
          }]
        };
        break;
        
      case 'cnpj':
        result = {
          razao_social: "Empresa Exemplo LTDA",
          cnpj: query,
          situacao: "Ativa",
          abertura: "10/05/2018",
          cnae: "6201-5/00 - Desenvolvimento de programas de computador sob encomenda",
          natureza: "Sociedade Empresária Limitada",
          capital_social: "R$ 50.000,00",
          socios: [{
            nome: "Maria Santos Silva",
            cpf: "***.***.***-**",
            participacao: "70%"
          }, {
            nome: "Pedro Oliveira Lima", 
            cpf: "***.***.***-**",
            participacao: "30%"
          }],
          endereco: {
            logradouro: "Av. Paulista, 1000",
            bairro: "Bela Vista",
            cidade: "São Paulo",
            uf: "SP",
            cep: "01310-100"
          }
        };
        break;
        
      case 'veiculo':
        result = {
          placa: query,
          renavam: "123456789",
          chassi: "9BWSU19F08B***",
          modelo: "CIVIC SEDAN LX",
          marca: "HONDA",
          ano_modelo: "2022",
          ano_fabricacao: "2022",
          cor: "PRATA",
          combustivel: "FLEX",
          situacao: "CIRCULACAO",
          proprietario: "JOÃO DA SILVA SANTOS",
          cidade: "SÃO PAULO/SP",
          multas: [{
            data: "2024-11-15",
            descricao: "Excesso de velocidade",
            valor: 293.47,
            local: "Av. Paulista, 1000"
          }, {
            data: "2024-10-20",
            descricao: "Estacionamento proibido", 
            valor: 130.16,
            local: "Rua Augusta, 500"
          }],
          total_multas: 2,
          valor_total_multas: 423.63,
          ipva: {
            ano: "2024",
            valor: 1250.80,
            situacao: "Pendente"
          }
        };
        break;
        
      case 'protestos':
        const hasProtests = Math.random() > 0.5;
        result = {
          constamProtestos: hasProtests,
          documentoConsultado: query,
          protestos: hasProtests ? [{
            estado: "SP",
            cartoriosProtesto: [{
              cidade: "São Paulo",
              nome: "1º Cartório de Protestos",
              protesto: [{
                dataProtesto: "2024-08-15",
                valorProtestado: "5000.00",
                apresentante: "Banco XYZ S/A"
              }, {
                dataProtesto: "2024-09-10", 
                valorProtestado: "2500.00",
                apresentante: "Loja ABC LTDA"
              }]
            }]
          }] : []
        };
        break;
        
      case 'imoveis':
        result = {
          imoveis: [{
            endereco: "Rua das Palmeiras, 456 - Ap 102",
            cidade: "São Paulo/SP",
            tipo: "Apartamento",
            area: "85m²",
            valor_venal: "R$ 350.000,00",
            situacao: "Regular"
          }, {
            endereco: "Chácara Santa Maria, Lote 15",
            cidade: "Atibaia/SP", 
            tipo: "Terreno",
            area: "1000m²",
            valor_venal: "R$ 180.000,00",
            situacao: "Regular"
          }],
          total_imoveis: 2
        };
        break;
        
      default:
        return new Response(JSON.stringify({ error: 'Invalid consultation type' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    // Save consultation to database
    const { error: consultationError } = await supabase
      .from('consultations')
      .insert({
        user_id: userId,
        consultation_type: type,
        query_data: { query, type },
        result_data: result,
        status: 'COMPLETED',
        cost_cents: 1500 // R$ 15.00
      });

    if (consultationError) {
      console.error('Error saving consultation:', consultationError);
    }

    // Deduct credits from user
    const { error: creditError } = await supabase
      .rpc('deduct_user_credits', { 
        user_id: userId, 
        amount_cents: 1500,
        description: `Consulta ${type.toUpperCase()} - ${query}`
      });

    if (creditError) {
      console.error('Error deducting credits:', creditError);
    }

    return new Response(JSON.stringify({
      success: true,
      data: result,
      credits_used: 1500
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in consultation-api function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});