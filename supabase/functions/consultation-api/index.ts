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
          metaDados: {
            consultaNome: "CPF",
            consultaUid: `CPF-${Date.now()}`,
            chave: "mob-cpf-key",
            usuario: "system",
            mensagem: "Consulta realizada com sucesso",
            ip: "127.0.0.1",
            resultadoId: 1,
            resultado: "Sucesso",
            apiVersao: "v3",
            enviarCallback: false,
            gerarComprovante: false,
            urlComprovante: "",
            assincrono: true,
            data: new Date().toLocaleString('pt-BR'),
            tempoExecucaoMs: 250
          },
          retorno: {
            cpf: query,
            nome: "João da Silva Santos",
            sexo: "M",
            dataNascimento: "15/03/1985",
            nomeMae: "Maria Santos Silva",
            idade: 39,
            signo: "Peixes",
            telefones: [{
              telefoneComDDD: "(11) 99999-9999",
              telemarketingBloqueado: false,
              operadora: "Vivo",
              tipoTelefone: "Celular",
              whatsApp: true
            }],
            enderecos: [{
              logradouro: "Rua das Flores",
              numero: "123",
              complemento: "Apto 45",
              bairro: "Centro",
              cidade: "São Paulo",
              uf: "SP",
              cep: "01234-567"
            }],
            emails: [{
              enderecoEmail: "joao.silva@email.com"
            }],
            rendaEstimada: "R$ 4.500,00",
            rendaFaixaSalarial: "De R$ 3.000 a R$ 5.000"
          }
        };
        break;
        
      case 'cnpj':
        result = {
          metaDados: {
            consultaNome: "CNPJ",
            consultaUid: `CNPJ-${Date.now()}`,
            chave: "mob-cnpj-key",
            usuario: "system",
            mensagem: "Consulta realizada com sucesso",
            ip: "127.0.0.1",
            resultadoId: 1,
            resultado: "Sucesso",
            apiVersao: "v3",
            enviarCallback: false,
            gerarComprovante: false,
            urlComprovante: "",
            assincrono: true,
            data: new Date().toLocaleString('pt-BR'),
            tempoExecucaoMs: 180
          },
          retorno: {
            cnpj: query,
            razaoSocial: "Empresa Exemplo LTDA",
            nomeFantasia: "Empresa Exemplo",
            dataFundacao: "10/05/2018",
            cnaeCodigo: 6201500,
            cnaeDescricao: "Desenvolvimento de programas de computador sob encomenda",
            cnaEsSecundarios: [{
              cnaeCodigoSecundario: 6202300,
              cnaeDescricaoSecundario: "Desenvolvimento e licenciamento de programas de computador customizáveis"
            }],
            situacaoCadastral: "ATIVA",
            situacaoEspecial: "",
            naturezaJuridicaCodigo: 206,
            naturezaJuridicaDescricao: "Sociedade Empresária Limitada",
            naturezaJuridicaTipo: "Empresária",
            porte: "MICROEMPRESA",
            faixaFuncionarios: "1 a 5",
            quantidadeFuncionarios: 3,
            faixaFaturamento: "Até R$ 360.000,00",
            faturamentoMedioCNAE: "R$ 250.000,00",
            faturamentoPresumido: "R$ 180.000,00",
            matriz: true,
            orgaoPublico: "NÃO",
            ramo: "Tecnologia",
            tipoEmpresa: "Limitada",
            tributacao: "Simples Nacional",
            opcaoMEI: "NÃO",
            opcaoSimples: "SIM",
            quantidadeFiliais: "0",
            telefones: [{
              telefoneComDDD: "(11) 3333-4444",
              telemarketingBloqueado: false,
              operadora: "Telefonica",
              tipoTelefone: "Fixo",
              whatsApp: false
            }],
            enderecos: [{
              logradouro: "Av. Paulista",
              numero: "1000",
              complemento: "Sala 100",
              bairro: "Bela Vista",
              cidade: "São Paulo",
              uf: "SP",
              cep: "01310-100"
            }],
            emails: [{
              enderecoEmail: "contato@empresa.com.br"
            }],
            ultimaAtualizacaoPJ: "15/08/2024",
            socios: [{
              documento: "***.***.***-**",
              nome: "Maria Santos Silva",
              percentualParticipacao: "70,00",
              dataEntrada: "10/05/2018",
              cargo: "Administradora"
            }, {
              documento: "***.***.***-**",
              nome: "Pedro Oliveira Lima",
              percentualParticipacao: "30,00",
              dataEntrada: "10/05/2018",
              cargo: "Sócio"
            }]
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

      case 'regularidade':
        result = {
          metaDados: {
            consultaNome: "REGULARIDADE_EMPRESA",
            consultaUid: `REG-${Date.now()}`,
            chave: "mob-reg-key",
            usuario: "system",
            mensagem: "Consulta realizada com sucesso",
            ip: "127.0.0.1",
            resultadoId: 1,
            resultado: "Sucesso",
            apiVersao: "v3",
            enviarCallback: false,
            gerarComprovante: false,
            urlComprovante: "",
            assincrono: true,
            data: new Date().toLocaleString('pt-BR'),
            tempoExecucaoMs: 320
          },
          retorno: {
            transportador: "Transportes Silva LTDA",
            documento: query,
            rntrc: 123456789,
            dataEmissao: "15/01/2024",
            dataConsulta: new Date().toLocaleDateString('pt-BR'),
            localizacao: {
              uf: "SP",
              municipio: "São Paulo"
            },
            categoria: "ETC",
            situacao: "ATIVO",
            apto: true,
            status: "REGULAR",
            observacao: "Empresa em situação regular para exercer atividade de transporte",
            protocolo: `PROT-${Date.now()}`
          }
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