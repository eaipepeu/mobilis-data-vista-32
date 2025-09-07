import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, CreditCard, QrCode, Banknote, Copy, Download, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [pixData, setPixData] = useState<any>(null);
  const [boletoData, setBoletoData] = useState<any>(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    cpf: ''
  });

  const { packageTitle = "Plano Profissional", price = 99.90, credits = 12000 } = location.state || {};

  const handlePixPayment = async () => {
    if (!userInfo.name || !userInfo.email || !userInfo.cpf) {
      toast({
        title: "Campos obrigatórios", 
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('process-mercadopago-payment', {
        body: {
          payment_method_id: 'pix',
          transaction_amount: price,
          description: `${packageTitle} - Mobilis Consultas`,
          payer: {
            email: userInfo.email,
            first_name: userInfo.name.split(' ')[0],
            identification: {
              type: 'CPF',
              number: userInfo.cpf.replace(/\D/g, '')
            }
          }
        }
      });

      if (error) throw error;

      if (data.success && data.pix_data) {
        setPixData(data.pix_data);
        toast({
          title: "PIX gerado!",
          description: "QR Code PIX gerado com sucesso.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro no PIX",
        description: error.message || "Erro ao gerar PIX",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBoletoPayment = async () => {
    if (!userInfo.name || !userInfo.email || !userInfo.cpf) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios", 
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('process-mercadopago-payment', {
        body: {
          payment_method_id: 'bolbradesco',
          transaction_amount: price,
          description: `${packageTitle} - Mobilis Consultas`,
          payer: {
            email: userInfo.email,
            first_name: userInfo.name.split(' ')[0],
            identification: {
              type: 'CPF',
              number: userInfo.cpf.replace(/\D/g, '')
            }
          }
        }
      });

      if (error) throw error;

      if (data.success && data.boleto_data) {
        setBoletoData(data.boleto_data);
        toast({
          title: "Boleto gerado!",
          description: "Boleto bancário gerado com sucesso.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro no boleto",
        description: error.message || "Erro ao gerar boleto",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold mb-2">Finalizar Pagamento</h1>
            <p className="text-muted-foreground">PIX e Boleto disponíveis</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Dados do Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        placeholder="Digite seu nome completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="cpf">CPF *</Label>
                      <Input
                        id="cpf"
                        value={userInfo.cpf}
                        onChange={(e) => setUserInfo({...userInfo, cpf: e.target.value})}
                        placeholder="000.000.000-00"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Forma de Pagamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="pix">
                        <QrCode className="w-4 h-4 mr-2" />
                        PIX
                      </TabsTrigger>
                      <TabsTrigger value="boleto">
                        <Banknote className="w-4 h-4 mr-2" />
                        Boleto
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pix" className="mt-6">
                      {!pixData ? (
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Pagamento instantâneo via PIX. Disponível 24h por dia.
                          </p>
                          <Button 
                            onClick={handlePixPayment}
                            className="w-full"
                            disabled={loading}
                            variant="hero"
                          >
                            {loading ? "Gerando PIX..." : `Gerar PIX ${formatCurrency(price)}`}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4 text-center">
                          <h3 className="font-semibold">PIX Gerado!</h3>
                          {pixData.qr_code_base64 && (
                            <div className="bg-white p-4 rounded-lg inline-block">
                              <img 
                                src={`data:image/png;base64,${pixData.qr_code_base64}`}
                                alt="QR Code PIX"
                                className="w-48 h-48 mx-auto"
                              />
                            </div>
                          )}
                          <Button onClick={() => navigator.clipboard.writeText(pixData.qr_code)} variant="outline" className="w-full">
                            <Copy className="w-4 h-4 mr-2" />
                            Copiar Código PIX
                          </Button>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="boleto" className="mt-6">
                      {!boletoData ? (
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Boleto bancário com vencimento em 3 dias úteis.
                          </p>
                          <Button 
                            onClick={handleBoletoPayment}
                            className="w-full"
                            disabled={loading}
                            variant="hero"
                          >
                            {loading ? "Gerando Boleto..." : `Gerar Boleto ${formatCurrency(price)}`}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4 text-center">
                          <h3 className="font-semibold">Boleto Gerado!</h3>
                          <Button
                            onClick={() => window.open(boletoData.transaction_details?.external_resource_url, '_blank')}
                            variant="outline"
                            className="w-full"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Baixar Boleto
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{packageTitle}</span>
                    <span className="font-semibold">{formatCurrency(price)}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {(credits / 100).toLocaleString('pt-BR')} créditos inclusos
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatCurrency(price)}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 mr-2" />
                    Pagamento seguro via Mercado Pago
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentNew;