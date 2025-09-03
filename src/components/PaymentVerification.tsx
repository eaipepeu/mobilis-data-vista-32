import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, RefreshCw, CheckCircle } from 'lucide-react';

interface PaymentVerificationProps {
  email: string;
  amount: number;
  planId?: string;
  onVerificationSuccess: (token: string) => void;
}

const PaymentVerification = ({ email, amount, planId, onVerificationSuccess }: PaymentVerificationProps) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [tokenSent, setTokenSent] = useState(false);
  const { toast } = useToast();

  const sendVerificationEmail = async () => {
    setIsResending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erro",
          description: "Usuário não autenticado",
          variant: "destructive"
        });
        return;
      }

      // Generate verification token
      const token = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Save token to database
      const { error: dbError } = await supabase
        .from('payment_tokens')
        .insert({
          user_id: user.id,
          token: token,
          email: email,
          amount_cents: amount * 100,
          plan_id: planId,
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
        });

      if (dbError) {
        console.error('Database error:', dbError);
        toast({
          title: "Erro",
          description: "Erro ao gerar token de verificação",
          variant: "destructive"
        });
        return;
      }

      // Send email with verification code
      const { error: emailError } = await supabase.functions.invoke('send-verification-email', {
        body: {
          email: email,
          token: token,
          amount: amount,
          planName: planId ? 'Plano Selecionado' : 'Pacote de Créditos'
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        toast({
          title: "Erro",
          description: "Erro ao enviar email de verificação",
          variant: "destructive"
        });
        return;
      }

      setTokenSent(true);
      toast({
        title: "Email enviado",
        description: `Código de verificação enviado para ${email}`,
      });

    } catch (error) {
      console.error('Error sending verification email:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar email de verificação",
        variant: "destructive"
      });
    } finally {
      setIsResending(false);
    }
  };

  const verifyToken = async () => {
    if (!verificationCode.trim()) {
      toast({
        title: "Erro",
        description: "Digite o código de verificação",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Erro",
          description: "Usuário não autenticado",
          variant: "destructive"
        });
        return;
      }

      // Verify token
      const { data: tokenData, error } = await supabase
        .from('payment_tokens')
        .select('*')
        .eq('user_id', user.id)
        .eq('token', verificationCode.toUpperCase())
        .eq('email', email)
        .is('verified_at', null)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error || !tokenData) {
        toast({
          title: "Código inválido",
          description: "Código de verificação inválido ou expirado",
          variant: "destructive"
        });
        return;
      }

      // Mark token as verified
      const { error: updateError } = await supabase
        .from('payment_tokens')
        .update({ verified_at: new Date().toISOString() })
        .eq('id', tokenData.id);

      if (updateError) {
        console.error('Update error:', updateError);
        toast({
          title: "Erro",
          description: "Erro ao verificar token",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Verificação concluída",
        description: "Email verificado com sucesso!",
      });

      onVerificationSuccess(verificationCode);

    } catch (error) {
      console.error('Error verifying token:', error);
      toast({
        title: "Erro",
        description: "Erro ao verificar código",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Verificação de Email
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Enviamos um código de verificação para confirmar seu email antes do pagamento
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">Email para verificação</Label>
          <Input
            id="email"
            type="email"
            value={email}
            disabled
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="amount">Valor do pagamento</Label>
          <Input
            id="amount"
            value={`R$ ${amount.toFixed(2)}`}
            disabled
            className="mt-1"
          />
        </div>

        {!tokenSent ? (
          <Button
            onClick={sendVerificationEmail}
            disabled={isResending}
            className="w-full"
          >
            {isResending ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            {isResending ? 'Enviando...' : 'Enviar Código de Verificação'}
          </Button>
        ) : (
          <>
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-800">
                Código enviado para {email}
              </p>
            </div>

            <div>
              <Label htmlFor="verification-code">Código de Verificação</Label>
              <Input
                id="verification-code"
                placeholder="Digite o código de 6 dígitos"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="mt-1 text-center text-lg tracking-wider"
              />
            </div>

            <div className="space-y-2">
              <Button
                onClick={verifyToken}
                disabled={isLoading || !verificationCode}
                className="w-full"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Verificando...' : 'Verificar Código'}
              </Button>

              <Button
                variant="outline"
                onClick={sendVerificationEmail}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Reenviar Código
              </Button>
            </div>
          </>
        )}

        <p className="text-xs text-muted-foreground text-center">
          O código expira em 30 minutos. Verifique sua caixa de spam caso não receba o email.
        </p>
      </CardContent>
    </Card>
  );
};

export default PaymentVerification;