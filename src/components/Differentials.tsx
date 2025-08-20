import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CreditCard, 
  Bell, 
  Shield, 
  Clock, 
  HeadphonesIcon, 
  FileText,
  Zap,
  Award
} from 'lucide-react';
import securityImage from '@/assets/security-icon.jpg';
import instantImage from '@/assets/instant-search.jpg';

const Differentials = () => {
  const differentials = [
    {
      icon: CreditCard,
      title: 'Parcelamento de Débitos',
      description: 'Exclusivo da Mobilis: parcele multas e IPVA em até 12x com taxa especial. Transformamos sua consulta em solução completa.',
      color: 'bg-trust-light text-trust'
    },
    {
      icon: Bell,
      title: 'Alertas Inteligentes',
      description: 'Receba notificações automáticas sobre vencimentos, novas multas e atualizações nos veículos cadastrados. Nunca mais perca prazos importantes.',
      color: 'bg-secondary-light text-secondary'
    },
    {
      icon: Shield,
      title: 'Máxima Segurança',
      description: 'Dados criptografados com certificação SSL, proteção avançada contra fraudes e total conformidade com a LGPD.',
      color: 'bg-primary-light text-primary'
    },
    {
      icon: Clock,
      title: 'Tempo Real',
      description: 'Consultas processadas instantaneamente com dados atualizados dos órgãos oficiais. Velocidade sem comprometer a precisão.',
      color: 'bg-trust-light text-trust'
    },
    {
      icon: HeadphonesIcon,
      title: 'Suporte Especializado',
      description: 'Equipe técnica especializada disponível 24/7 para auxiliar em suas consultas e dúvidas técnicas.',
      color: 'bg-secondary-light text-secondary'
    },
    {
      icon: FileText,
      title: 'Relatórios Detalhados',
      description: 'Gere relatórios completos em PDF com selo de autenticidade para uso profissional e jurídico.',
      color: 'bg-primary-light text-primary'
    }
  ];

  const stats = [
    { number: '3K+', label: 'Consultas realizadas', icon: Zap },
    { number: '99.9%', label: 'Disponibilidade', icon: Shield },
    { number: '24/7', label: 'Suporte online', icon: Clock },
    { number: 'Recém-criada', label: 'Empresa comprometida', icon: Award }
  ];

  return (
    <section id="differentials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Soluções Completas, Além da Consulta
          </h2>
          <p className="text-xl text-muted-foreground">
            Diferenciais da Mobilis: Mais que consultas, oferecemos soluções completas para suas necessidades
          </p>
        </div>

        {/* Main Differentials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {differentials.map((differential) => {
            const IconComponent = differential.icon;
            return (
              <Card key={differential.title} className="hover:shadow-card transition-smooth group">
                <CardHeader className="pb-4">
                  <div className={`p-3 rounded-lg inline-flex mb-3 ${differential.color} group-hover:scale-110 transition-smooth`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{differential.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{differential.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Differentials with Images */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-primary rounded-2xl p-8 text-white flex items-center">
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <CreditCard className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Parcelamento Exclusivo</h3>
              </div>
              <p className="text-white/90 text-lg">
                Somos a única plataforma que permite parcelar débitos veiculares em até 12x. 
                Consulte, identifique e quite seus débitos em um só lugar.
              </p>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium">Parcelamento em até 12x sem juros para valores acima de R$ 500</p>
              </div>
            </div>
            <div className="hidden md:block ml-8">
              <img 
                src={securityImage} 
                alt="Segurança de dados" 
                className="w-32 h-32 rounded-lg object-cover"
              />
            </div>
          </div>

          <div className="bg-gradient-secondary rounded-2xl p-8 text-white flex items-center">
            <div className="flex-1 space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <Bell className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Alertas Inteligentes</h3>
              </div>
              <p className="text-white/90 text-lg">
                Cadastre seus veículos e receba alertas automáticos sobre vencimentos, 
                novas multas e atualizações importantes.
              </p>
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium">Incluso nos planos de assinatura sem custo adicional</p>
              </div>
            </div>
            <div className="hidden md:block ml-8">
              <img 
                src={instantImage} 
                alt="Consultas instantâneas" 
                className="w-32 h-32 rounded-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-card p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Números que Comprovam nossa Excelência</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="text-center group">
                  <div className="bg-primary-light p-3 rounded-lg inline-flex mb-3 group-hover:bg-primary group-hover:text-white transition-smooth">
                    <IconComponent className="w-6 h-6 text-primary group-hover:text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Section */}
        <div className="text-center mt-12">
          <div className="bg-muted/50 rounded-lg p-6">
            <h4 className="font-semibold text-lg mb-2">Certificações e Conformidade</h4>
            <p className="text-muted-foreground">
              Certificação SSL • Conformidade LGPD • Dados Oficiais • Auditoria de Segurança
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentials;