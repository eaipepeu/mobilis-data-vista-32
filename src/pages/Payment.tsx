import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Declare MercadoPago on window for TypeScript
declare global {
  interface Window {
    MercadoPago: any;
  }
}

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [mp, setMp] = useState<any>(null);
  const [cardForm, setCardForm] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const navigate = useNavigate();
  const { toast } = useToast();

  const plans = [
    {
      id: 'basic',
      name: 'Plano Básico',
      price: 50.00,
      credits: 5000, // R$ 50,00 em créditos
      description: '50 consultas básicas',
      features: ['CPF, CNPJ, Veículos', 'Suporte por email', 'Relatórios em PDF']
    },
    {
      id: 'professional',
      name: 'Plano Profissional',
      price: 100.00,
      credits: 10000, // R$ 100,00 em créditos
      description: '100 consultas completas',
      features: ['Todas as consultas', 'Suporte prioritário', 'API de integração', 'Relatórios avançados']
    },
    {
      id: 'enterprise',
      name: 'Plano Empresarial',
      price: 300.00,
      credits: 30000, // R$ 300,00 em créditos
      description: '300 consultas + benefícios',
      features: ['Consultas ilimitadas', 'Suporte 24/7', 'Dashboard personalizado', 'Múltiplos usuários']
    }
  ];

  const selectedPlanData = plans.find(p => p.id === selectedPlan) || plans[0];

  useEffect(() => {
    // Load Mercado Pago SDK
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => {
      // Initialize Mercado Pago - Using test keys for now
      const mercadoPago = new window.MercadoPago('TEST-4202d489-c5c5-4899-b7a3-e188e5b7acd8', {
        locale: 'pt-BR'
      });
      
      setMp(mercadoPago);
      
      // Initialize card form
      const form = mercadoPago.cardForm({
        amount: selectedPlanData.price.toString(),
        autoMount: true,
        form: {
          id: 'form-checkout',
          cardholderName: { id: 'form-checkout__cardholderName' },
          cardholderEmail: { id: 'form-checkout__cardholderEmail' },
          cardNumber: { id: 'form-checkout__cardNumber' },
          cardExpirationMonth: { id: 'form-checkout__cardExpirationMonth' },
          cardExpirationYear: { id: 'form-checkout__cardExpirationYear' },
          securityCode: { id: 'form-checkout__securityCode' },
          installments: { id: 'form-checkout__installments' },
          identificationType: { id: 'form-checkout__identificationType' },
          identificationNumber: { id: 'form-checkout__identificationNumber' },
          issuer: { id: 'form-checkout__issuer' }
        },
        callbacks: {
          onFormMounted: (error: any) => {
            if (error) {
              console.warn('Erro ao montar form: ', error);
              toast({
                title: "Erro no formulário",
                description: "Erro ao carregar formulário de pagamento",
                variant: "destructive"
              });
            }
          },
          onSubmit: (event: any) => {
            event.preventDefault();
            handlePayment();
          }
        }
      });
      
      setCardForm(form);
    };
    
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, [selectedPlan]);

  const handlePayment = async () => {
    if (!cardForm) return;
    
    setLoading(true);
    
    try {
      const formData = cardForm.getCardFormData();
      
      // Mock payment processing - In real implementation, this would call your backend
      const response = await fetch('/api/process_payment', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer fake-token` // In real app, use actual auth token
        },
        body: JSON.stringify({
          ...formData,
          amount: selectedPlanData.price,
          plan: selectedPlan,
          credits: selectedPlanData.credits
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro no processamento do pagamento');
      }
      
      const result = await response.json();
      
      if (result.status === 'approved') {
        toast({
          title: "✅ Pagamento aprovado!",
          description: `Créditos de R$ ${selectedPlanData.price.toFixed(2)} adicionados à sua conta`
        });
        
        // Redirect to dashboard after successful payment
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        toast({
          title: "⚠️ Pagamento não aprovado",
          description: `Status: ${result.status}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erro no pagamento",
        description: "Ocorreu um erro ao processar o pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Adquirir Créditos
            </h1>
            <p className="text-xl text-muted-foreground">
              Escolha seu plano e adicione créditos à sua conta
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Plan Selection */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Escolha seu Plano</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {plans.map((plan) => (
                    <div 
                      key={plan.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPlan === plan.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{plan.name}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            R$ {plan.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {plan.credits / 100} créditos
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{plan.description}</p>
                      <ul className="space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-secondary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Dados do Cartão</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form id="form-checkout" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="form-checkout__cardholderName">Nome no cartão</Label>
                        <Input 
                          type="text" 
                          id="form-checkout__cardholderName" 
                          placeholder="Nome completo"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="form-checkout__cardholderEmail">Email</Label>
                        <Input 
                          type="email" 
                          id="form-checkout__cardholderEmail" 
                          placeholder="seu@email.com"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="form-checkout__cardNumber">Número do cartão</Label>
                      <Input 
                        type="text" 
                        id="form-checkout__cardNumber" 
                        placeholder="0000 0000 0000 0000"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="form-checkout__cardExpirationMonth">Mês</Label>
                        <Input 
                          type="text" 
                          id="form-checkout__cardExpirationMonth" 
                          placeholder="MM"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="form-checkout__cardExpirationYear">Ano</Label>
                        <Input 
                          type="text" 
                          id="form-checkout__cardExpirationYear" 
                          placeholder="AAAA"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="form-checkout__securityCode">CVV</Label>
                        <Input 
                          type="text" 
                          id="form-checkout__securityCode" 
                          placeholder="123"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="form-checkout__installments">Parcelas</Label>
                      <Select>
                        <SelectTrigger id="form-checkout__installments" className="mt-1">
                          <SelectValue placeholder="Escolha as parcelas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1x de R$ {selectedPlanData.price.toFixed(2)} sem juros</SelectItem>
                          <SelectItem value="2">2x de R$ {(selectedPlanData.price / 2).toFixed(2)} sem juros</SelectItem>
                          <SelectItem value="3">3x de R$ {(selectedPlanData.price / 3).toFixed(2)} sem juros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="form-checkout__identificationType">Tipo de documento</Label>
                        <Select>
                          <SelectTrigger id="form-checkout__identificationType" className="mt-1">
                            <SelectValue placeholder="Tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CPF">CPF</SelectItem>
                            <SelectItem value="CNPJ">CNPJ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="form-checkout__identificationNumber">Número do documento</Label>
                        <Input 
                          type="text" 
                          id="form-checkout__identificationNumber" 
                          placeholder="000.000.000-00"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <select id="form-checkout__issuer" style={{ display: 'none' }}></select>

                    <div className="pt-4">
                      <div className="bg-muted/50 p-4 rounded-lg mb-4">
                        <div className="flex items-center justify-between text-lg font-semibold">
                          <span>Total:</span>
                          <span className="text-primary">R$ {selectedPlanData.price.toFixed(2)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {selectedPlanData.credits / 100} créditos serão adicionados à sua conta
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={loading}
                        variant="hero"
                      >
                        {loading ? (
                          'Processando...'
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Pagar R$ {selectedPlanData.price.toFixed(2)}
                          </>
                        )}
                      </Button>

                      <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-muted-foreground">
                        <Shield className="w-4 h-4" />
                        <span>Pagamento 100% seguro com Mercado Pago</span>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;