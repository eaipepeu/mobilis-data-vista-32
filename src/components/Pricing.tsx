import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  // Pacotes de Créditos (Pay-per-use)
  const packages = [
    {
      title: "Pacote Básico",
      price: "R$ 50",
      credits: "R$ 60 em créditos",
      description: "Ideal para quem precisa de consultas rápidas e pontuais, sem compromisso",
      features: [
        "Consultas de CPF e Veículos",
        "Suporte via e-mail",
        "Validade: 3 meses"
      ],
      icon: "💼",
      popular: false
    },
    {
      title: "Pacote Empresarial", 
      price: "R$ 100",
      credits: "R$ 120 em créditos",
      description: "Perfeito para quem precisa de mais controle e dados. Tenha acesso a relatórios de suas consultas.",
      features: [
        "Consultas de CPF e Veículos",
        "Suporte via e-mail", 
        "Relatório PDF",
        "Validade: 6 meses"
      ],
      icon: "🏢",
      popular: true
    }
  ];

  // Planos de Assinatura (Subscription)
  const plans = [
    {
      title: "Plano Intermediário",
      price: "Fale Conosco",
      period: "",
      description: "A solução completa para profissionais. Otimize seu trabalho com relatórios detalhados e suporte diferenciado.",
      features: [
        "700 consultas",
        "Todas as consultas CPF, CNPJ e Veículos",
        "Suporte via e-mail e whatsapp",
        "02 relatórios",
        "Histórico de Consultas",
        "Plano mensal com fidelidade de 12 meses"
      ],
      icon: "⚡",
      buttonText: "Fale Conosco",
      isContact: true
    },
    {
      title: "Plano Essencial",
      price: "Fale Conosco", 
      period: "",
      description: "Ideal para profissionais que precisam de relatórios completos e histórico de consultas",
      features: [
        "2000 consultas",
        "Todas as consultas CPF, CNPJ e Veículos",
        "Suporte exclusivo",
        "Relatórios completos",
        "Histórico de Consultas",
        "Plano mensal com fidelidade de 12 meses"
      ],
      icon: "🚀",
      buttonText: "Fale Conosco",
      isContact: true
    },
    {
      title: "Plano Pro",
      price: "Fale Conosco",
      period: "",
      description: "Feito para grandes volumes. Inclui todos os recursos essenciais, com alertas e alta capacidade de consultas",
      features: [
        "4000 consultas",
        "Todas as consultas disponíveis",
        "Suporte exclusivo",
        "Relatórios completos", 
        "Histórico de Consultas",
        "Alertas Personalizados",
        "Plano mensal com fidelidade de 12 meses"
      ],
      icon: "👑",
      buttonText: "Fale Conosco",
      premium: true,
      isContact: true
    }
  ];

  // Preços individuais
  const individualPrices = [
    { service: "Consulta CPF", price: "R$ 2,99" },
    { service: "Consulta CNPJ", price: "R$ 4,99" },
    { service: "Consulta Veículo", price: "R$ 3,99" }
  ];

  const handleContactWhatsApp = () => {
    const phoneNumber = "5511981162006";
    const message = "Olá! Gostaria de saber mais sobre os planos de assinatura da Mobilis Consultas.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePurchase = (packageTitle: string, price: string) => {
    navigate('/payment', { 
      state: { 
        packageTitle, 
        price: price.replace('R$ ', ''),
        type: 'package'
      } 
    });
  };

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
            {packages.map((pkg) => (
              <Card key={pkg.title} className={`relative hover:shadow-card transition-smooth ${pkg.popular ? 'border-primary shadow-card' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-3">{pkg.icon}</div>
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                    <div className="text-lg text-secondary font-semibold">
                      = {pkg.credits}
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
                  
                  <Button 
                    variant={pkg.popular ? "hero" : "outline"} 
                    className="w-full"
                    onClick={() => handlePurchase(pkg.title, pkg.price)}
                  >
                    Adquirir Pacote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Planos de Assinatura</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.title} className={`hover:shadow-card transition-smooth ${plan.premium ? 'border-secondary' : ''}`}>
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-3">{plan.icon}</div>
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
                    onClick={handleContactWhatsApp}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
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