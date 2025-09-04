import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Legal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            📋 Termos de Uso
          </h1>
          
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-8">
                
                <section>
                  <h2 className="text-2xl font-semibold mb-4">1. Introdução</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Este Termo de Uso regula o acesso e a utilização da plataforma Mobilis Consultas. 
                    Ao utilizar nossos serviços, o usuário concorda com este documento e com nossa 
                    Política de Privacidade.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">2. Serviços Oferecidos</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A Mobilis Consultas oferece consultas de CPF, CNPJ, veículos e imóveis, incluindo 
                    dados cadastrais, pontuação de crédito, histórico financeiro, protestos, quadro 
                    societário e pendências. Também disponibilizamos parcelamento de débitos e alertas 
                    inteligentes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">3. Obrigações do Usuário</h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Fornecer informações corretas, atualizadas e verdadeiras.</li>
                    <li>Utilizar os serviços apenas para fins lícitos, pessoais ou profissionais.</li>
                    <li>Respeitar a legislação vigente, incluindo a LGPD, sendo o usuário responsável pelo uso dos relatórios obtidos.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">4. Propriedade Intelectual</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Todos os direitos de propriedade intelectual sobre textos, imagens, logotipos e 
                    design pertencem à Mobilis Consultas, sendo vedada sua reprodução sem autorização.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">5. Proteção de Dados e Privacidade</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    A Mobilis Consultas se compromete a tratar os dados pessoais em conformidade com 
                    a LGPD, observando os princípios de finalidade, necessidade, segurança e transparência. 
                    Para mais informações, consulte a Política de Privacidade.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">6. Limitação de Responsabilidade</h2>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>A Mobilis Consultas não se responsabiliza pelo uso indevido das informações obtidas na plataforma.</li>
                    <li>Os dados são fornecidos por fontes oficiais, e eventuais divergências são de responsabilidade dessas entidades.</li>
                    <li>A Mobilis atua como intermediária de acesso a informações públicas e privadas, sem modificar o conteúdo.</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">7. Denúncias e Canal de Contato</h2>
                  <p className="text-muted-foreground mb-4">
                    O usuário pode denunciar mau uso da plataforma, violações ou incidentes de dados 
                    por meio do canal oficial de contato:
                  </p>
                  <p className="text-primary font-semibold">📧 suporte@mobilisconsultas.com.br</p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">8. Alterações do Termo</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Este Termo poderá ser alterado a qualquer momento, sendo informado previamente 
                    aos usuários por meio da plataforma ou por e-mail cadastrado.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4">9. Legislação Aplicável</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Este Termo é regido pelas leis da República Federativa do Brasil, especialmente 
                    a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
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

