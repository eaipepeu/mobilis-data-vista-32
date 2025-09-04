import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Building2, 
  Car, 
  Home, 
  FileText, 
  AlertTriangle,
  CreditCard,
  Search,
  Clock,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: User,
      title: 'Consulta de CPF',
      description: 'Dados cadastrais completos, score de crédito, endereços, telefones, empresas vinculadas e título de eleitor.',
      price: 'R$ 15,00',
      features: ['Dados pessoais', 'Score de crédito', 'Histórico financeiro', 'Protestos']
    },
    {
      icon: Building2,
      title: 'Consulta de CNPJ',
      description: 'Quadro societário, dados de contato, endereços, pendências financeiras e histórico empresarial.',
      price: 'R$ 25,00',
      features: ['Quadro societário', 'Situação fiscal', 'Pendências', 'Histórico']
    },
    {
      icon: Car,
      title: 'Consulta de Veículo',
      description: 'Histórico completo por placa, débitos, multas, licenciamento, leilões e sinistros.',
      price: 'R$ 18,00',
      features: ['Débitos IPVA', 'Multas pendentes', 'Histórico de leilão', 'CRLV-e']
    },
    {
      icon: Search,
      title: 'Proprietário pela Placa',
      description: 'Identifique o proprietário atual do veículo através da placa com dados completos.',
      price: 'R$ 12,00',
      features: ['Dados do proprietário', 'Endereço atual', 'Histórico de propriedade']
    },
    {
      icon: Home,
      title: 'Bens Imóveis',
      description: 'Consulta completa de imóveis vinculados ao CPF ou CNPJ, incluindo valores e localizações.',
      price: 'R$ 20,00',
      features: ['Propriedades vinculadas', 'Valores de mercado', 'Situação legal']
    },
    {
      icon: FileText,
      title: 'Protestos Nacional',
      description: 'Pesquisa abrangente de protestos ativos e inativos em cartórios de todo o Brasil.',
      price: 'R$ 10,00',
      features: ['Protestos ativos', 'Histórico completo', 'Detalhes por cartório']
    }
  ];

  const advantages = [
    {
      icon: Clock,
      title: 'Resultados Instantâneos',
      description: 'Consultas processadas em tempo real'
    },
    {
      icon: Shield,
      title: 'Dados Seguros',
      description: 'Informações criptografadas e protegidas'
    },
    {
      icon: CreditCard,
      title: 'Pagamento Flexível',
      description: 'PIX, cartão ou boleto bancário'
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Serviços de Consulta
          </h2>
          <p className="text-xl text-muted-foreground">
            Acesse informações completas e atualizadas com nossa plataforma de consultas profissional
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.title} className="hover:shadow-card transition-smooth group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-primary-light p-3 rounded-lg group-hover:bg-primary group-hover:text-white transition-smooth">
                      <IconComponent className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{service.price}</div>
                      <div className="text-sm text-muted-foreground">por consulta</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>
                  
                  <div className="space-y-2">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/dashboard" className="block pt-2">
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                      Consultar Agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Advantages */}
        <div className="bg-gradient-primary rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Por que escolher a Mobilis?</h3>
            <p className="text-white/90">Tecnologia avançada para consultas profissionais</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {advantages.map((advantage) => {
              const IconComponent = advantage.icon;
              return (
                <div key={advantage.title} className="text-center">
                  <div className="bg-white/10 p-4 rounded-lg inline-flex mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{advantage.title}</h4>
                  <p className="text-white/80">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;