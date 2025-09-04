import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Award, Lock, CheckCircle, CreditCard, Database, Globe, Users } from 'lucide-react';

const Certifications = () => {
  const securityCerts = [
    {
      icon: Shield,
      title: "ISO 27001:2013",
      category: "Segurança da Informação",
      description: "Certificação internacional para sistemas de gestão de segurança da informação",
      issuer: "BSI - British Standards Institution",
      validity: "Válido até: Dezembro 2025",
      status: "Ativo"
    },
    {
      icon: Lock,
      title: "SOC 2 Type II",
      category: "Controles de Segurança",
      description: "Auditoria independente de controles de segurança, disponibilidade e confidencialidade",
      issuer: "AICPA - American Institute of CPAs",
      validity: "Válido até: Junho 2025",
      status: "Ativo"
    },
    {
      icon: CreditCard,
      title: "PCI DSS Level 1",
      category: "Segurança em Pagamentos",
      description: "Padrão de segurança para empresas que processam, armazenam ou transmitem dados de cartão",
      issuer: "PCI Security Standards Council",
      validity: "Válido até: Março 2025",
      status: "Ativo"
    }
  ];

  const complianceCerts = [
    {
      icon: Users,
      title: "LGPD Compliance",
      category: "Proteção de Dados",
      description: "Conformidade total com a Lei Geral de Proteção de Dados Pessoais",
      issuer: "Certificação Interna + Auditoria Externa",
      validity: "Verificado em: Janeiro 2025",
      status: "Conforme"
    },
    {
      icon: Globe,
      title: "GDPR Compliant",
      category: "Regulamentação Internacional",
      description: "Conformidade com o Regulamento Geral de Proteção de Dados da União Europeia",
      issuer: "European Data Protection Board",
      validity: "Verificado em: Janeiro 2025",
      status: "Conforme"
    },
    {
      icon: Award,
      title: "Certificação Digital ICP-Brasil",
      category: "Assinatura Digital",
      description: "Infraestrutura de Chaves Públicas Brasileira para documentos digitais",
      issuer: "ITI - Instituto Nacional de Tecnologia",
      validity: "Válido até: Agosto 2025",
      status: "Ativo"
    }
  ];

  const technicalCerts = [
    {
      icon: Database,
      title: "AWS Well-Architected",
      category: "Infraestrutura em Nuvem",
      description: "Framework de boas práticas para arquiteturas seguras, confiáveis e eficientes",
      issuer: "Amazon Web Services",
      validity: "Revisado em: Dezembro 2024",
      status: "Certificado"
    },
    {
      icon: Shield,
      title: "SSL/TLS Certificate",
      category: "Criptografia",
      description: "Certificado de segurança Extended Validation para proteção de dados em trânsito",
      issuer: "DigiCert Inc.",
      validity: "Válido até: Setembro 2025",
      status: "Ativo"
    },
    {
      icon: CheckCircle,
      title: "Penetration Testing",
      category: "Testes de Segurança",
      description: "Testes de penetração realizados por empresa especializada em cibersegurança",
      issuer: "CyberSec Solutions",
      validity: "Último teste: Novembro 2024",
      status: "Aprovado"
    }
  ];

  const partnerships = [
    {
      name: "Serasa Experian",
      type: "Parceiro Oficial de Dados",
      logo: "🏢",
      description: "Parceria para acesso a dados oficiais de CPF, CNPJ e score de crédito"
    },
    {
      name: "SPC Brasil",
      type: "Integração de Dados",
      logo: "📊",
      description: "Acesso autorizado às bases de dados de proteção ao crédito"
    },
    {
      name: "DETRAN Nacional",
      type: "Dados Veiculares",
      logo: "🚗",
      description: "Integração oficial para consultas de veículos e infrações"
    },
    {
      name: "Receita Federal",
      type: "Dados Empresariais",
      logo: "🏛️",
      description: "Acesso autorizado às informações oficiais de CNPJ"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Award className="w-16 h-16 mx-auto mb-6 text-white/90" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Certificações e Selos
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Nosso compromisso com a excelência é reconhecido pelas principais organizações 
              de segurança e conformidade do mundo
            </p>
          </div>
        </section>

        {/* Security Certifications */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Certificações de Segurança
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {securityCerts.map((cert, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {cert.status}
                    </Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <cert.icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{cert.title}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {cert.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {cert.description}
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p><strong>Emissor:</strong> {cert.issuer}</p>
                      <p><strong>{cert.validity}</strong></p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Certifications */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Conformidade e Regulamentação
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {complianceCerts.map((cert, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {cert.status}
                    </Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                      <cert.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{cert.title}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {cert.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {cert.description}
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p><strong>Verificador:</strong> {cert.issuer}</p>
                      <p><strong>{cert.validity}</strong></p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Certifications */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Certificações Técnicas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {technicalCerts.map((cert, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                      {cert.status}
                    </Badge>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                      <cert.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">{cert.title}</CardTitle>
                    <Badge variant="outline" className="w-fit">
                      {cert.category}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {cert.description}
                    </p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p><strong>Certificador:</strong> {cert.issuer}</p>
                      <p><strong>{cert.validity}</strong></p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Official Partnerships */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Parcerias Oficiais
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {partnerships.map((partner, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{partner.logo}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{partner.name}</h3>
                        <Badge variant="outline" className="mb-3">
                          {partner.type}
                        </Badge>
                        <p className="text-muted-foreground text-sm">
                          {partner.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Measures */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Medidas de Segurança Implementadas
              </h2>
              <Card>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-4">
                        🔐 Proteção de Dados
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Criptografia AES-256 para dados em repouso
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          TLS 1.3 para dados em trânsito
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Backups criptografados em múltiplas regiões
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Auditoria completa de acessos
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-4">
                        🛡️ Controles de Acesso
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Autenticação multifator obrigatória
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Princípio do menor privilégio
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Monitoramento 24/7 de atividades
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          Logs imutáveis de segurança
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Trust Badge */}
        <section className="py-16 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <Shield className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Selo de Confiança Mobilis
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Todas essas certificações garantem que seus dados estão protegidos pelos 
              mais altos padrões de segurança internacional.
            </p>
            <Badge variant="secondary" className="text-lg px-8 py-3">
              Verificado e Certificado - 2025
            </Badge>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Certifications;