import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Award, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Segurança",
      description: "Dados criptografados com certificação SSL, proteção avançada contra fraudes e total conformidade com a LGPD."
    },
    {
      icon: Clock,
      title: "Agilidade",
      description: "Resultados instantâneos processados em tempo real com dados atualizados dos órgãos oficiais."
    },
    {
      icon: Award,
      title: "Qualidade",
      description: "Informações completas e atualizadas com nossa plataforma de consultas profissionais."
    },
    {
      icon: Users,
      title: "Suporte",
      description: "Equipe técnica disponível 24 horas por dia, 7 dias por semana para auxiliar em suas consultas."
    }
  ];

  const differentials = [
    "Parcelamento de Débitos: Exclusivo da Mobilis, parcelar multas e IPVA em até 12x com taxa especial",
    "Somos a única plataforma que permite parcelar subsídios veiculares em até 12x",
    "Consulte, identifique e quite seus débitos em um só lugar",
    "Mais que consultas, oferecemos soluções completas para suas necessidades"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Sobre a Mobilis Consultas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              A Mobilis Consultas é uma plataforma completa e intuitiva, projetada para fornecer 
              informações cadastrais, patrimoniais e jurídicas de forma rápida, segura e confiável.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold mb-8">Nossa Missão</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossa missão é transformar o acesso a dados complexos em soluções simples para 
                profissionais e empresas, garantindo segurança e conformidade com a LGPD.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Oferecemos resultados instantâneos, processados em tempo real a partir de dados 
                atualizados de órgãos oficiais, para que você tenha precisão e agilidade em suas decisões.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Differentials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Soluções Completas, Além da Consulta
              </h2>
              <p className="text-center text-lg text-muted-foreground mb-8">
                Diferenciais da Mobilis: Mais que consultas, oferecemos soluções completas para suas necessidades.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {differentials.map((differential, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Award className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm font-medium">{differential}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Entre em Contato</h2>
            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-muted-foreground">
                <strong>Endereço:</strong> Avenida dos Estados, 432, Vila D'Agostinho<br />
                Valinhos - SP, CEP: 13284-170
              </p>
              <p className="text-muted-foreground">
                <strong>CNPJ:</strong> 62.270.941/0001-00
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <a 
                  href="https://wa.me/5519999999999" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  WhatsApp
                </a>
                <a 
                  href="mailto:suporte@mobilisconsultas.com.br"
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;