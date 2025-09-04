import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Lock, Eye, Users, Database, Mail } from 'lucide-react';

const Privacy = () => {
  const principles = [
    {
      icon: Lock,
      title: "Criptografia Avançada",
      description: "Todos os dados são criptografados com algoritmos de última geração"
    },
    {
      icon: Eye,
      title: "Acesso Restrito",
      description: "Apenas pessoal autorizado tem acesso às informações dos usuários"
    },
    {
      icon: Database,
      title: "Armazenamento Seguro",
      description: "Dados armazenados em servidores certificados com backup redundante"
    },
    {
      icon: Users,
      title: "Controle do Usuário",
      description: "Você tem total controle sobre seus dados pessoais"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-white/90" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Política de Privacidade
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Seu direito à privacidade é nossa prioridade. Entenda como protegemos seus dados.
            </p>
          </div>
        </section>

        {/* Principles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Nossos Princípios de Privacidade
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {principles.map((principle, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <principle.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">1. Informações que Coletamos</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        <strong>Dados Pessoais:</strong> Nome completo, CPF, RG, endereço, telefone, email, data de nascimento.
                      </p>
                      <p>
                        <strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas, tempo de permanência.
                      </p>
                      <p>
                        <strong>Dados de Consulta:</strong> Histórico de consultas realizadas, dados consultados, resultados obtidos.
                      </p>
                      <p>
                        <strong>Dados de Pagamento:</strong> Informações de cartão de crédito (criptografadas), histórico de transações.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">2. Como Utilizamos suas Informações</h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>• <strong>Prestação de Serviços:</strong> Para processar consultas e fornecer resultados precisos</p>
                      <p>• <strong>Autenticação:</strong> Para verificar sua identidade e garantir a segurança da conta</p>
                      <p>• <strong>Pagamentos:</strong> Para processar transações e emitir comprovantes</p>
                      <p>• <strong>Comunicação:</strong> Para enviar notificações importantes e suporte ao cliente</p>
                      <p>• <strong>Melhorias:</strong> Para aprimorar nossos serviços e experiência do usuário</p>
                      <p>• <strong>Conformidade Legal:</strong> Para cumprir obrigações legais e regulamentares</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">3. Compartilhamento de Dados</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        <strong>NÃO compartilhamos seus dados pessoais</strong> com terceiros para fins comerciais, 
                        exceto nas seguintes situações específicas:
                      </p>
                      <p>• <strong>Órgãos Oficiais:</strong> Quando solicitado por autoridades competentes</p>
                      <p>• <strong>Processadores de Pagamento:</strong> Para validar transações (dados criptografados)</p>
                      <p>• <strong>Parceiros Técnicos:</strong> Prestadores de serviços que auxiliam nossa operação (sob rigoroso contrato de confidencialidade)</p>
                      <p>• <strong>Emergências:</strong> Para proteger a segurança ou direitos legais nossos ou de terceiros</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">4. Seus Direitos (LGPD)</h2>
                    <div className="space-y-3 text-muted-foreground">
                      <p>• <strong>Acesso:</strong> Solicitar informações sobre o tratamento de seus dados</p>
                      <p>• <strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</p>
                      <p>• <strong>Anonimização:</strong> Solicitar a anonimização de dados desnecessários</p>
                      <p>• <strong>Eliminação:</strong> Requerer a exclusão de dados pessoais</p>
                      <p>• <strong>Portabilidade:</strong> Solicitar a transferência de dados para outro fornecedor</p>
                      <p>• <strong>Revogação:</strong> Revogar o consentimento a qualquer momento</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">5. Segurança dos Dados</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Implementamos múltiplas camadas de segurança para proteger suas informações:
                      </p>
                      <p>• <strong>Criptografia SSL/TLS:</strong> Proteção durante a transmissão</p>
                      <p>• <strong>Criptografia AES-256:</strong> Proteção durante o armazenamento</p>
                      <p>• <strong>Autenticação Multifator:</strong> Acesso seguro às contas</p>
                      <p>• <strong>Monitoramento 24/7:</strong> Detecção de atividades suspeitas</p>
                      <p>• <strong>Backups Seguros:</strong> Redundância e recuperação de dados</p>
                      <p>• <strong>Auditoria Regular:</strong> Verificações periódicas de segurança</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">6. Retenção de Dados</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Mantemos seus dados apenas pelo tempo necessário para:
                      </p>
                      <p>• <strong>Dados de Conta:</strong> Enquanto a conta estiver ativa + 5 anos após encerramento</p>
                      <p>• <strong>Histórico de Consultas:</strong> 5 anos para fins de auditoria e conformidade</p>
                      <p>• <strong>Dados de Pagamento:</strong> Conforme exigências fiscais (até 5 anos)</p>
                      <p>• <strong>Logs de Segurança:</strong> 2 anos para investigações de segurança</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">7. Cookies e Tecnologias Similares</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Utilizamos cookies para melhorar sua experiência:
                      </p>
                      <p>• <strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site</p>
                      <p>• <strong>Cookies de Performance:</strong> Para análise e melhoria dos serviços</p>
                      <p>• <strong>Cookies de Personalização:</strong> Para customizar sua experiência</p>
                      <p>
                        Você pode gerenciar suas preferências de cookies nas configurações do navegador.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-primary">8. Alterações na Política</h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Esta política pode ser atualizada periodicamente. Quando isso ocorrer:
                      </p>
                      <p>• Notificaremos por email sobre mudanças significativas</p>
                      <p>• A nova versão será publicada em nosso site</p>
                      <p>• A data de "última atualização" será modificada</p>
                    </div>
                  </div>

                  <div className="bg-primary/10 p-6 rounded-lg">
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-primary mb-2">Contato do Encarregado de Dados</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Para exercer seus direitos ou esclarecer dúvidas sobre esta política:
                        </p>
                        <p className="text-sm">
                          <strong>Email:</strong> dpo@mobilisconsultas.com.br<br />
                          <strong>Telefone:</strong> (11) 97777-7777<br />
                          <strong>Horário:</strong> Segunda a Sexta, 9h às 18h
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-muted-foreground pt-8 border-t">
                    <p><strong>Última atualização:</strong> Janeiro de 2025</p>
                    <p><strong>Versão:</strong> 2.0</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;