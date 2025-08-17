import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Clock, Award, Users, Database, Lock } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "3K+", label: "Consultas Realizadas", icon: Database },
    { number: "5.000+", label: "Clientes Ativos", icon: Users },
    { number: "99,9%", label: "Disponibilidade", icon: Clock },
    { number: "24/7", label: "Suporte Online", icon: Shield }
  ];

  const values = [
    {
      icon: Shield,
      title: "Segurança",
      description: "Protegemos seus dados com as mais avançadas tecnologias de criptografia e seguimos rigorosamente a LGPD."
    },
    {
      icon: Clock,
      title: "Agilidade",
      description: "Consultas processadas em tempo real com resultados instantâneos e interface intuitiva."
    },
    {
      icon: Award,
      title: "Qualidade",
      description: "Dados sempre atualizados e precisos, provenientes de fontes oficiais e confiáveis."
    },
    {
      icon: Users,
      title: "Atendimento",
      description: "Suporte especializado 24/7 para garantir a melhor experiência do usuário."
    }
  ];

  const certifications = [
    "ISO 27001 - Segurança da Informação",
    "LGPD Compliance - Proteção de Dados",
    "PCI DSS - Segurança em Pagamentos",
    "SSL/TLS - Criptografia Avançada",
    "Certificação Digital ICP-Brasil"
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
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Somos uma empresa nova com total comprometimento com a segurança dos dados 
              dos nossos clientes e garantimos suporte online 24/7 com disponibilidade de 99,9%.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Números que Comprovam nossa Excelência
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Nossa História</h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <img 
                    src="/lovable-uploads/d95e1fef-1a1c-4f82-a6c9-5c5655ed82d8.png" 
                    alt="Mobilis Consultas" 
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A Mobilis Consultas nasceu da necessidade de democratizar o acesso a 
                    informações cadastrais, patrimoniais e jurídicas de forma rápida, 
                    segura e confiável.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Como uma empresa nova no mercado, trazemos uma visão moderna e 
                    inovadora, com total comprometimento com a proteção dos dados dos 
                    nossos clientes e os mais altos padrões de segurança.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Nossa missão é fornecer informações precisas e atualizadas, 
                    contribuindo para decisões mais seguras em negócios, investimentos 
                    e relacionamentos comerciais.
                  </p>
                </div>
              </div>
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

        {/* Certifications */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Certificações de Segurança
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <Lock className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{cert}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Badge variant="secondary" className="text-lg px-6 py-2">
                  Certificado pelo Serasa Experian
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Nossa Missão</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Democratizar o acesso a informações essenciais para tomada de decisões, 
                    oferecendo consultas rápidas, precisas e seguras, sempre com foco na 
                    proteção dos dados pessoais e na satisfação do cliente.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Nossa Visão</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Ser a principal referência em consultas cadastrais no Brasil, 
                    reconhecida pela excelência em atendimento, inovação tecnológica 
                    e compromisso com a segurança da informação.
                  </p>
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

export default About;