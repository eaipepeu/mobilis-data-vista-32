import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const packages = [
    {
      title: 'Pacote Básico',
      price: 'R$ 50,00',
      credits: 'R$ 60,00',
      description: 'Ideal para uso pessoal e consultas esporádicas',
      features: [
        'R$ 60,00 em créditos de consulta',
        'Validade de 6 meses',
        'Todas as consultas disponíveis',
        'Suporte via email'
      ],
      icon: Star,
      popular: false
    },
    {
      title: 'Pacote Empresarial',
      price: 'R$ 100,00',
      credits: 'R$ 130,00',
      description: 'Melhor custo-benefício para empresas',
      features: [
        'R$ 130,00 em créditos de consulta',
        'Validade de 12 meses',
        'Todas as consultas disponíveis',
        'Suporte prioritário',
        'Relatórios em PDF'
      ],
      icon: Zap,
      popular: true
    }
  ];

  const plans = [
    {
      title: 'Plano Essencial',
      price: 'R$ 199,00',
      period: '/mês',
      description: 'Para pequenas empresas e profissionais',
      features: [
        '50 consultas de CPF ou Veículo',
        '10 consultas de CNPJ',
        '5 consultas de Bens Imóveis',
        'Relatórios detalhados',
        'Suporte especializado',
        'Histórico de consultas'
      ],
      icon: Star,
      buttonText: 'Assinar Plano'
    },
    {
      title: 'Plano Ilimitado',
      price: 'R$ 499,00',
      period: '/mês',
      description: 'Para grandes empresas e alto volume',
      features: [
        'Consultas ilimitadas',
        'API para integração',
        'Suporte 24/7',
        'Relatórios personalizados',
        'Gerenciador de equipe',
        'Alertas automáticos',
        'Consultoria especializada'
      ],
      icon: Crown,
      buttonText: 'Contatar Vendas',
      premium: true
    }
  ];

  const individualPrices = [
    { service: 'CPF Completo', price: 'R$ 15,00' },
    { service: 'CNPJ Completo', price: 'R$ 25,00' },
    { service: 'Veículo - Histórico Completo', price: 'R$ 18,00' },
    { service: 'Proprietário pela Placa', price: 'R$ 12,00' },
    { service: 'Bens Imóveis por CPF/CNPJ', price: 'R$ 20,00' }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Planos e Preços
          </h2>
          <p className="text-xl text-muted-foreground">
            Escolha o plano ideal para suas necessidades de consulta
          </p>
        </div>

        {/* Individual Prices */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Consultas Avulsas</h3>
          <div className="grid md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {individualPrices.map((item) => (
              <Card key={item.service} className="text-center">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2">{item.service}</h4>
                  <div className="text-lg font-bold text-primary">{item.price}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Credit Packages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Pacotes de Créditos</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {packages.map((pkg) => {
              const IconComponent = pkg.icon;
              return (
                <Card key={pkg.title} className={`relative hover:shadow-card transition-smooth ${pkg.popular ? 'border-primary shadow-card' : ''}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                        Mais Popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="bg-primary-light p-3 rounded-lg inline-flex mx-auto mb-3">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{pkg.title}</CardTitle>
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                      <div className="text-lg text-secondary font-semibold">
                        = {pkg.credits} em créditos
                      </div>
                      <p className="text-muted-foreground text-sm">{pkg.description}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {pkg.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-secondary" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Link to="/dashboard" className="block">
                      <Button 
                        variant={pkg.popular ? "hero" : "outline"} 
                        className="w-full"
                      >
                        Adquirir Pacote
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Subscription Plans */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Planos de Assinatura</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <Card key={plan.title} className={`hover:shadow-card transition-smooth ${plan.premium ? 'border-secondary bg-gradient-to-br from-secondary-light to-background' : ''}`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`p-3 rounded-lg inline-flex mx-auto mb-3 ${plan.premium ? 'bg-secondary text-white' : 'bg-primary-light'}`}>
                      <IconComponent className={`w-6 h-6 ${plan.premium ? 'text-white' : 'text-primary'}`} />
                    </div>
                    <CardTitle className="text-xl">{plan.title}</CardTitle>
                    <div className="space-y-1">
                      <div className="flex items-baseline justify-center">
                        <span className="text-3xl font-bold text-primary">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-secondary" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      variant={plan.premium ? "consultation" : "hero"} 
                      className="w-full"
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="text-center mt-12 p-6 bg-muted/30 rounded-lg">
          <h4 className="font-semibold mb-2">Formas de Pagamento</h4>
          <p className="text-muted-foreground">PIX • Cartão de Crédito • Boleto Bancário</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;