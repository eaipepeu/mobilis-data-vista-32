import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, Lock, Award } from 'lucide-react';

const Legal = () => {
  const documents = [
    {
      icon: FileText,
      title: "Termos de Uso",
      description: "Condições gerais de utilização da plataforma Mobilis Consultas",
      lastUpdate: "Janeiro 2025"
    },
    {
      icon: Shield,
      title: "Política de Privacidade",
      description: "Como coletamos, usamos e protegemos suas informações pessoais",
      lastUpdate: "Janeiro 2025"
    },
    {
      icon: Lock,
      title: "LGPD - Lei Geral de Proteção de Dados",
      description: "Nosso compromisso com a proteção dos seus dados pessoais",
      lastUpdate: "Janeiro 2025"
    },
    {
      icon: Award,
      title: "Certificações",
      description: "Selos e certificações de segurança que possuímos",
      lastUpdate: "Janeiro 2025"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Informações Legais
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Transparência e conformidade legal são fundamentais para nossa operação
            </p>
          </div>
        </section>

        {/* Legal Documents */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Documentos Legais
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {documents.map((doc, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <doc.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{doc.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Atualizado em {doc.lastUpdate}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{doc.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Informações da Empresa
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados Corporativos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <strong>Razão Social:</strong><br />
                      Mobilis Consultas Ltda.
                    </div>
                    <div>
                      <strong>CNPJ:</strong><br />
                      XX.XXX.XXX/0001-XX
                    </div>
                    <div>
                      <strong>Endereço:</strong><br />
                      Rua das Consultas, 123<br />
                      São Paulo - SP, 01234-567
                    </div>
                    <div>
                      <strong>Telefone:</strong><br />
                      (11) 99999-9999
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Licenças e Autorizações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <strong>Registro JUCESP:</strong><br />
                      NIRE 35.XXX.XXX.XXX
                    </div>
                    <div>
                      <strong>Inscrição Municipal:</strong><br />
                      XXXXX.XXX-X
                    </div>
                    <div>
                      <strong>Certificação Serasa:</strong><br />
                      Autorizado para consultas
                    </div>
                    <div>
                      <strong>Conformidade LGPD:</strong><br />
                      Certificada desde 2023
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Legal */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">
              Contato Jurídico
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Para questões legais, dúvidas sobre termos ou solicitações relacionadas à LGPD
            </p>
            <div className="space-y-4">
              <p><strong>Email:</strong> juridico@mobilisconsultas.com.br</p>
              <p><strong>Telefone:</strong> (11) 98888-8888</p>
              <p><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;