import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            📄 Política de Privacidade
          </h1>
          
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-8">
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A Mobilis Consultas valoriza a privacidade e a proteção de dados pessoais. Esta Política 
                    descreve de forma clara como coletamos, usamos, armazenamos e compartilhamos suas 
                    informações, de acordo com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD).
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">2. Informações que Coletamos</h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Dados de identificação: nome, e-mail, CPF/CNPJ, telefone.</li>
                    <li>Dados de navegação e uso: histórico de consultas, endereço IP, cookies e registros de acesso.</li>
                    <li>Dados financeiros: informações necessárias para parcelamento de débitos ou contratação de serviços.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">3. Finalidade e Bases Legais</h2>
                  <p className="text-muted-foreground mb-4">
                    Tratamos seus dados pessoais apenas para as finalidades descritas abaixo:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li><strong>Execução de contrato:</strong> viabilizar a prestação dos serviços contratados.</li>
                    <li><strong>Cumprimento de obrigação legal:</strong> atender determinações legais e regulatórias.</li>
                    <li><strong>Interesse Legítimo:</strong> melhorar a experiência de navegação e prevenir fraudes.</li>
                    <li><strong>Consentimento:</strong> envio de comunicações de marketing, quando autorizado pelo titular.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">4. Compartilhamento de Dados</h2>
                  <p className="text-muted-foreground mb-4">
                    Seus dados poderão ser compartilhados apenas com:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Fontes oficiais e parceiros necessários para a execução dos serviços.</li>
                    <li>Autoridades governamentais, mediante obrigação legal.</li>
                    <li>Provedores de tecnologia, hospedagem em nuvem e meios de pagamento, sempre respeitando a LGPD.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">5. Transferência Internacional de Dados</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Caso haja necessidade de armazenar informações em servidores localizados fora do Brasil, 
                    asseguramos que o tratamento seguirá as salvaguardas previstas na LGPD (art. 33 e seguintes).
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">6. Prazo de Retenção</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Os dados serão armazenados apenas pelo tempo necessário para o cumprimento das finalidades 
                    descritas ou enquanto durar a relação contratual. Após esse prazo, serão eliminados ou 
                    anonimizados, salvo obrigação legal de retenção.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">7. Direitos do Titular</h2>
                  <p className="text-muted-foreground mb-4">
                    Você pode, a qualquer momento:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Solicitar confirmação da existência de tratamento.</li>
                    <li>Solicitar acesso, correção, exclusão ou portabilidade de seus dados.</li>
                    <li>Revogar o consentimento dado anteriormente.</li>
                    <li>Opor-se a certos tratamentos.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">8. Segurança dos Dados</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Adotamos medidas técnicas e organizacionais adequadas, incluindo criptografia, firewall, 
                    certificação SSL e monitoramento contínuo para prevenção de incidentes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">9. Encarregado pelo Tratamento de Dados (DPO)</h2>
                  <p className="text-muted-foreground mb-4">
                    Para exercer seus direitos ou esclarecer dúvidas, entre em contato com nosso Encarregado de Dados (DPO):
                  </p>
                  <p className="text-primary font-semibold">📧 dpo@mobilisconsultas.com.br</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">10. Atualizações desta Política</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Esta Política poderá ser atualizada periodicamente. Alterações relevantes serão comunicadas 
                    de forma clara aos usuários.
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

