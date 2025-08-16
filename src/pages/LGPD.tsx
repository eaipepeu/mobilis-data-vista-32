import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, FileText, Users, Lock, CheckCircle, AlertCircle, Mail, Phone } from 'lucide-react';

const LGPD = () => {
  const rights = [
    {
      icon: FileText,
      title: "Confirmação e Acesso",
      description: "Saber se tratamos seus dados e acessar as informações que possuímos sobre você."
    },
    {
      icon: CheckCircle,
      title: "Correção",
      description: "Corrigir dados incompletos, inexatos ou desatualizados em nossos registros."
    },
    {
      icon: Lock,
      title: "Anonimização ou Bloqueio",
      description: "Solicitar a anonimização ou bloqueio de dados desnecessários ou excessivos."
    },
    {
      icon: AlertCircle,
      title: "Eliminação",
      description: "Requerer a exclusão de dados pessoais tratados com base no seu consentimento."
    },
    {
      icon: Users,
      title: "Portabilidade",
      description: "Transferir seus dados para outro fornecedor de serviços ou produtos."
    },
    {
      icon: Shield,
      title: "Revogação do Consentimento",
      description: "Retirar seu consentimento para o tratamento de dados a qualquer momento."
    }
  ];

  const measures = [
    "Criptografia de dados em trânsito e em repouso",
    "Controles rígidos de acesso às informações",
    "Monitoramento contínuo de segurança",
    "Backups seguros e redundantes",
    "Treinamento regular da equipe em proteção de dados",
    "Auditorias periódicas de conformidade",
    "Políticas claras de retenção de dados",
    "Processos de notificação de incidentes"
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
              LGPD - Lei Geral de Proteção de Dados
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Nosso compromisso com a transparência, segurança e proteção dos seus dados pessoais
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                O que é a LGPD?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A Lei Geral de Proteção de Dados (Lei nº 13.709/2018) estabelece regras sobre coleta, 
                armazenamento, tratamento e compartilhamento de dados pessoais, garantindo maior controle 
                aos cidadãos sobre suas informações e impondo responsabilidades às empresas que tratam 
                esses dados.
              </p>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Seus Direitos como Titular de Dados
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {rights.map((right, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <right.icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{right.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{right.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How We Comply */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Como a Mobilis Consultas Cumpre a LGPD
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-primary" />
                      Medidas de Segurança
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {measures.map((measure, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {measure}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Governança de Dados
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Encarregado de Dados (DPO)</h4>
                      <p className="text-sm text-muted-foreground">
                        Temos um Encarregado de Proteção de Dados responsável por assegurar 
                        o cumprimento da LGPD e atender solicitações dos titulares.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Relatório de Impacto</h4>
                      <p className="text-sm text-muted-foreground">
                        Realizamos avaliações de impacto à proteção de dados para atividades 
                        de alto risco aos direitos dos titulares.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Registros de Atividades</h4>
                      <p className="text-sm text-muted-foreground">
                        Mantemos registros detalhados de todas as atividades de tratamento 
                        de dados pessoais realizadas.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Data Treatment */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Bases Legais para Tratamento de Dados
              </h2>
              
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        1. Consentimento
                      </h3>
                      <p className="text-muted-foreground">
                        Para o envio de comunicações promocionais e personalização de conteúdo, 
                        solicitamos seu consentimento expresso e específico.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        2. Execução de Contrato
                      </h3>
                      <p className="text-muted-foreground">
                        Tratamos dados necessários para a prestação dos serviços de consulta 
                        contratados e processamento de pagamentos.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        3. Cumprimento de Obrigação Legal
                      </h3>
                      <p className="text-muted-foreground">
                        Mantemos registros conforme exigido pela legislação fiscal, trabalhista 
                        e de defesa do consumidor.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-3">
                        4. Legítimo Interesse
                      </h3>
                      <p className="text-muted-foreground">
                        Para prevenção de fraudes, segurança da informação e melhoria dos 
                        nossos serviços, sempre respeitando seus direitos fundamentais.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Exercise Rights */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                Como Exercer seus Direitos
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Para exercer qualquer dos seus direitos ou esclarecer dúvidas sobre 
                o tratamento dos seus dados, entre em contato conosco:
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground mb-4">
                      Entre em contato com nosso Encarregado de Dados
                    </p>
                    <Button variant="outline">
                      dpo@mobilisconsultas.com.br
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6 text-center">
                    <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Telefone</h3>
                    <p className="text-muted-foreground mb-4">
                      Atendimento especializado em proteção de dados
                    </p>
                    <Button variant="outline">
                      (11) 97777-7777
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 p-6 bg-primary/10 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Prazo de Resposta</h4>
                <p className="text-sm text-muted-foreground">
                  Nos comprometemos a responder suas solicitações em até <strong>15 dias úteis</strong>, 
                  conforme estabelecido pela LGPD. Em casos excepcionais, este prazo pode ser 
                  prorrogado por mais 15 dias, com justificativa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Incident Notification */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">
                Notificação de Incidentes
              </h2>
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-4">
                        Compromisso com a Transparência
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Em caso de incidente de segurança que possa acarretar risco ou dano 
                        relevante aos titulares de dados, nos comprometemos a:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Comunicar à ANPD em até 72 horas após tomar conhecimento do incidente
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Notificar os titulares afetados em prazo razoável
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Disponibilizar informações sobre medidas tomadas para mitigar os efeitos
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Implementar melhorias para prevenir novos incidentes
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Last Update */}
        <section className="py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="text-sm text-muted-foreground">
              <p><strong>Última atualização:</strong> Janeiro de 2025</p>
              <p><strong>Versão:</strong> 3.0 - Conforme Lei nº 13.709/2018</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LGPD;