import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, CreditCard, Shield, CheckCircle } from 'lucide-react';
import PaymentVerification from '@/components/PaymentVerification';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

const MercadoPagoPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cardForm, setCardForm] = useState<any>(null);
  const [paymentData, setPaymentData] = useState({
    cardholderName: '',
    cardholderEmail: '',
    identificationType: '',
    identificationNumber: '',
  });
  const [showVerification, setShowVerification] = useState(false);
  const [verifiedToken, setVerifiedToken] = useState('');
  const [processing, setProcessing] = useState(false);

  // Get payment details from location state
  const { packageTitle, price, type } = location.state || {};
  const amount = parseFloat(price || '0');

  useEffect(() => {
    // Load MercadoPago SDK
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = initializeMercadoPago;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMercadoPago = () => {
    const mp = new window.MercadoPago('TEST-4202d489-c5c5-4899-b7a3-e188e5b7acd8', {
      locale: 'pt-BR',
    });

    const cardFormInstance = mp.cardForm({
      amount: amount.toString(),
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
        issuer: { id: 'form-checkout__issuer' },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) {
            console.warn('Erro ao montar form: ', error);
            toast({
              title: "Erro",
              description: "Erro ao carregar formulário de pagamento",
              variant: "destructive"
            });
          }
        },
        onSubmit: (event: any) => {
          event.preventDefault();
          handlePayment();
        },
      },
    });

    setCardForm(cardFormInstance);
  };

  const handlePayment = async () => {
    if (!cardForm) {
      toast({
        title: "Erro",
        description: "Formulário de pagamento não carregado",
        variant: "destructive"
      });
      return;
    }

    if (!verifiedToken) {
      toast({
        title: "Verificação necessária",
        description: "Primeiro você precisa verificar seu email",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);
    
    try {
      const formData = cardForm.getCardFormData();

      const { error } = await supabase.functions.invoke('process-mercadopago-payment', {
        body: {
          ...formData,
          amount: amount,
          description: `${packageTitle} - Mobilis Consultas`,
          verification_token: verifiedToken,
          package_info: {
            title: packageTitle,
            price: amount,
            type: type
          }
        }
      });

      if (error) {
        console.error('Payment error:', error);
        toast({
          title: "Erro no pagamento",
          description: error.message || "Erro ao processar pagamento",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Pagamento aprovado!",
        description: "Seu pagamento foi processado com sucesso",
      });

      // Redirect to success page or dashboard
      navigate('/dashboard', { 
        state: { 
          paymentSuccess: true,
          packageTitle: packageTitle
        }
      });

    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: "Erro",
        description: "Erro ao processar pagamento",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleVerificationSuccess = (token: string) => {
    setVerifiedToken(token);
    setShowVerification(false);
    toast({
      title: "Email verificado",
      description: "Agora você pode prosseguir com o pagamento",
    });
  };

  if (!packageTitle || !price) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">
              Dados de pagamento não encontrados
            </p>
            <Button onClick={() => navigate('/pricing')}>
              Voltar aos Planos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showVerification) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => setShowVerification(false)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Pagamento
          </Button>
          
          <PaymentVerification
            email={paymentData.cardholderEmail}
            amount={amount}
            onVerificationSuccess={handleVerificationSuccess}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Resumo do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-medium">{packageTitle}</span>
                <span className="font-bold text-lg">R$ {amount.toFixed(2)}</span>
              </div>
              
              {verifiedToken && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Email verificado</span>
                </div>
              )}

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Pagamento 100% seguro</p>
                <p>✓ Certificado SSL</p>
                <p>✓ Dados protegidos</p>
              </div>

              {!verifiedToken && (
                <Button
                  onClick={() => setShowVerification(true)}
                  className="w-full"
                  variant="outline"
                >
                  Verificar Email Primeiro
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Dados do Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form id="form-checkout" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="form-checkout__cardholderName">Nome no cartão</Label>
                  <Input
                    id="form-checkout__cardholderName"
                    placeholder="Nome como impresso no cartão"
                    required
                    value={paymentData.cardholderName}
                    onChange={(e) => setPaymentData({...paymentData, cardholderName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-checkout__cardholderEmail">E-mail</Label>
                  <Input
                    id="form-checkout__cardholderEmail"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    value={paymentData.cardholderEmail}
                    onChange={(e) => setPaymentData({...paymentData, cardholderEmail: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-checkout__cardNumber">Número do cartão</Label>
                  <Input
                    id="form-checkout__cardNumber"
                    placeholder="0000 0000 0000 0000"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="form-checkout__cardExpirationMonth">Mês</Label>
                    <Input
                      id="form-checkout__cardExpirationMonth"
                      placeholder="MM"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="form-checkout__cardExpirationYear">Ano</Label>
                    <Input
                      id="form-checkout__cardExpirationYear"
                      placeholder="AAAA"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-checkout__securityCode">CVV</Label>
                  <Input
                    id="form-checkout__securityCode"
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-checkout__installments">Parcelas</Label>
                  <select
                    id="form-checkout__installments"
                    className="w-full p-2 border border-input rounded-md"
                    required
                  >
                    <option value="">Selecione as parcelas</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-checkout__identificationType">Tipo de documento</Label>
                  <select
                    id="form-checkout__identificationType"
                    className="w-full p-2 border border-input rounded-md"
                    required
                    value={paymentData.identificationType}
                    onChange={(e) => setPaymentData({...paymentData, identificationType: e.target.value})}
                  >
                    <option value="">Selecione o tipo</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-checkout__identificationNumber">Número do documento</Label>
                  <Input
                    id="form-checkout__identificationNumber"
                    placeholder="CPF/RG"
                    required
                    value={paymentData.identificationNumber}
                    onChange={(e) => setPaymentData({...paymentData, identificationNumber: e.target.value})}
                  />
                </div>

                <select
                  id="form-checkout__issuer"
                  className="hidden"
                  required
                >
                  <option value="">Selecione o banco</option>
                </select>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!verifiedToken || processing}
                >
                  {processing ? 'Processando...' : `Pagar R$ ${amount.toFixed(2)}`}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MercadoPagoPayment;