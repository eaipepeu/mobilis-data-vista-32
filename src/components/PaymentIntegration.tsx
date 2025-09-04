import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Smartphone, QrCode, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentIntegrationProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentIntegration = ({ amount, onSuccess, onCancel }: PaymentIntegrationProps) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixCode, setPixCode] = useState('');
  const { toast } = useToast();

  const handleCardPayment = async () => {
    setIsProcessing(true);
    
    // Simulated Mercado Pago card payment
    try {
      // This would integrate with Mercado Pago's card tokenization
      const paymentData = {
        transaction_amount: amount,
        description: 'Créditos Mobilis Consultas',
        payment_method_id: 'visa',
        payer: {
          email: 'cliente@email.com'
        }
      };

      // Simulate API call to Mercado Pago
      setTimeout(() => {
        toast({
          title: "Pagamento aprovado!",
          description: `Créditos de R$ ${amount.toFixed(2)} foram adicionados à sua conta.`,
        });
        setIsProcessing(false);
        onSuccess();
      }, 3000);

    } catch (error) {
      toast({
        title: "Erro no pagamento",
        description: "Tente novamente ou use outro método de pagamento.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  const handlePixPayment = async () => {
    setIsProcessing(true);
    
    // Simulated PIX payment generation
    try {
      const pixPaymentData = {
        transaction_amount: amount,
        payment_method_id: "pix",
        description: "Créditos Mobilis Consultas",
        payer: {
          email: "cliente@email.com"
        }
      };

      // Simulate PIX code generation
      setTimeout(() => {
        const generatedPixCode = `00020126580014BR.GOV.BCB.PIX01364d6bca44-5b14-4d28-8ca9-${Date.now()}520400005303986540${amount.toFixed(2)}5802BR5913Mobilis Consultas6009Sao Paulo62070503***6304`;
        setPixCode(generatedPixCode);
        setIsProcessing(false);
      }, 2000);

    } catch (error) {
      toast({
        title: "Erro ao gerar PIX",
        description: "Tente novamente.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5" />
          <span>Adicionar Créditos</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Valor: <span className="font-bold">R$ {amount.toFixed(2)}</span>
        </p>
      </CardHeader>

      <CardContent>
        <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card">Cartão</TabsTrigger>
            <TabsTrigger value="pix">PIX</TabsTrigger>
            <TabsTrigger value="installments">Parcelado</TabsTrigger>
          </TabsList>

          {/* Card Payment */}
          <TabsContent value="card" className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="cardNumber">Número do Cartão</Label>
                <Input
                  id="cardNumber"
                  placeholder="**** **** **** ****"
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="expiry">Validade</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="***"
                    maxLength={4}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="holderName">Nome no Cartão</Label>
                <Input
                  id="holderName"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <Button 
              onClick={handleCardPayment}
              disabled={isProcessing}
              className="w-full"
              variant="hero"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processando...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pagar com Cartão
                </>
              )}
            </Button>
          </TabsContent>

          {/* PIX Payment */}
          <TabsContent value="pix" className="space-y-4">
            {!pixCode ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <QrCode className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Clique no botão para gerar o código PIX
                </p>
                <Button 
                  onClick={handlePixPayment}
                  disabled={isProcessing}
                  className="w-full"
                  variant="hero"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Gerando PIX...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4 mr-2" />
                      Gerar Código PIX
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-32 h-32 bg-muted border-2 border-dashed border-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-16 h-16 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Escaneie o QR Code com seu app do banco
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ou copie o código PIX abaixo
                  </p>
                </div>
                
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs font-mono break-all">{pixCode}</p>
                </div>
                
                <Button variant="outline" className="w-full">
                  Copiar Código PIX
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  O pagamento será confirmado automaticamente após a aprovação
                </p>
              </div>
            )}
          </TabsContent>

          {/* Installments */}
          <TabsContent value="installments" className="space-y-4">
            <div className="space-y-3">
              <div className="bg-primary/10 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">
                  Parcelamento Exclusivo Mobilis
                </h4>
                <p className="text-sm text-muted-foreground">
                  Parcele débitos veiculares em até 12x com nossa taxa especial
                </p>
              </div>
              
              <div className="space-y-2">
                {[1, 2, 3, 6, 12].map((installments) => (
                  <div key={installments} className="flex justify-between p-2 border rounded">
                    <span>{installments}x</span>
                    <span>R$ {(amount / installments).toFixed(2)} / mês</span>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleCardPayment}
              disabled={isProcessing}
              className="w-full"
              variant="hero"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Parcelar Pagamento
            </Button>
          </TabsContent>
        </Tabs>

        <Separator className="my-4" />

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancelar
          </Button>
        </div>

        <div className="text-xs text-center text-muted-foreground mt-4">
          <p>Pagamento seguro processado pelo Mercado Pago</p>
          <p>Seus dados estão protegidos</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentIntegration;