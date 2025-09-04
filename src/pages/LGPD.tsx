import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Lock, FileText, Eye, Bell } from "lucide-react";

const LGPD = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              LGPD - Lei Geral de Proteção de Dados
            </h1>
            <p className="text-xl text-muted-foreground">
              Conformidade e Transparência da Mobilis Consultas
            </p>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-8">
                
                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">Sobre a LGPD</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    A Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) estabelece regras 
                    claras sobre coleta, armazenamento, tratamento e compartilhamento de dados pessoais, 
                    garantindo mais controle aos titulares sobre suas informações pessoais.
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">Nosso Compromisso</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    A Mobilis Consultas está em total conformidade com a LGPD, implementando todas 
                    as medidas necessárias para proteger os dados pessoais de nossos usuários:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Tratamento de dados baseado em bases legais sólidas</li>
                    <li>Transparência total sobre o uso de dados pessoais</li>
                    <li>Implementação de medidas de segurança técnicas e organizacionais</li>
                    <li>Respeito aos direitos dos titulares de dados</li>
                    <li>Notificação de incidentes quando necessário</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">Seus Direitos como Titular</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    A LGPD garante diversos direitos aos titulares de dados pessoais. Na Mobilis Consultas, 
                    você pode exercer os seguintes direitos:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Confirmação de Tratamento</h3>
                      <p className="text-sm text-muted-foreground">
                        Saber se tratamos seus dados pessoais
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Acesso aos Dados</h3>
                      <p className="text-sm text-muted-foreground">
                        Consultar quais dados pessoais possuímos
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Correção de Dados</h3>
                      <p className="text-sm text-muted-foreground">
                        Solicitar correção de dados incompletos ou incorretos
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Eliminação de Dados</h3>
                      <p className="text-sm text-muted-foreground">
                        Solicitar exclusão de dados desnecessários
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Portabilidade</h3>
                      <p className="text-sm text-muted-foreground">
                        Transferir dados para outro fornecedor
                      </p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Revogação do Consentimento</h3>
                      <p className="text-sm text-muted-foreground">
                        Retirar consentimento para tratamento de dados
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">Bases Legais para Tratamento</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Tratamos dados pessoais apenas com base nas seguintes hipóteses legais:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Consentimento:</strong> Quando você autoriza expressamente</li>
                    <li><strong>Execução de contrato:</strong> Para prestar os serviços contratados</li>
                    <li><strong>Cumprimento de obrigação legal:</strong> Quando exigido por lei</li>
                    <li><strong>Interesse legítimo:</strong> Para melhorar nossos serviços e prevenir fraudes</li>
                    <li><strong>Exercício regular de direitos:</strong> Em processos judiciais</li>
                  </ul>
                </section>

                <section>
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold">Como Exercer Seus Direitos</h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Para exercer qualquer um dos seus direitos previstos na LGPD, entre em contato conosco:
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Encarregado de Dados (DPO)</h3>
                    <p className="text-primary font-semibold">📧 dpo@mobilisconsultas.com.br</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Responderemos sua solicitação em até 15 dias úteis, conforme estabelecido pela LGPD.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">Atualizações e Transparência</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Este documento será atualizado sempre que houver mudanças significativas em 
                    nossas práticas de proteção de dados. Todas as alterações serão comunicadas 
                    previamente aos usuários através dos canais oficiais da Mobilis Consultas.
                  </p>
                </section>

              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

