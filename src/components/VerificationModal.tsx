import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Clock } from 'lucide-react';

interface VerificationModalProps {
  isOpen: boolean;
  email: string;
  onVerify: (code: string) => void;
  onResend: () => void;
  onClose: () => void;
  type?: 'registration' | 'payment';
}

const VerificationModal = ({ 
  isOpen, 
  email, 
  onVerify, 
  onResend, 
  onClose,
  type = 'registration'
}: VerificationModalProps) => {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos
  const { toast } = useToast();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = () => {
    if (code.length !== 6) {
      toast({
        title: "Código inválido",
        description: "O código deve ter 6 dígitos.",
        variant: "destructive"
      });
      return;
    }
    onVerify(code);
  };

  const handleResend = () => {
    setTimeLeft(600);
    setCode('');
    onResend();
    toast({
      title: "Código reenviado",
      description: "Um novo código foi enviado para seu email.",
    });
  };

  const titles = {
    registration: "Verificar Email",
    payment: "Confirmar Pagamento"
  };

  const descriptions = {
    registration: "Digite o código de 6 dígitos enviado para seu email para ativar sua conta.",
    payment: "Digite o código de 6 dígitos enviado para seu email para confirmar o pagamento."
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {titles[type]}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              {descriptions[type]}
            </p>
            <p className="text-sm font-medium mt-2">
              {email}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="verification-code">Código de Verificação</Label>
            <Input
              id="verification-code"
              type="text"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Código expira em: {formatTime(timeLeft)}</span>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleVerify}
              disabled={code.length !== 6}
              className="w-full"
              variant="hero"
            >
              Verificar Código
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Não recebeu o código?
              </p>
              <Button
                variant="link"
                onClick={handleResend}
                disabled={timeLeft > 540} // Só pode reenviar após 1 minuto
                className="text-sm"
              >
                Reenviar código
              </Button>
            </div>

            {type === 'registration' && (
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full"
              >
                Cancelar
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal;