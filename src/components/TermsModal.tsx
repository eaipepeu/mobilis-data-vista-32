import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface TermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onReject: () => void;
}

const TermsModal = ({ isOpen, onAccept, onReject }: TermsModalProps) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const { toast } = useToast();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAccept = () => {
    if (!hasScrolledToBottom) {
      toast({
        title: "Atenção",
        description: "Por favor, leia todos os termos antes de aceitar.",
        variant: "destructive"
      });
      return;
    }
    onAccept();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-bold text-center">
            Termos e Condições de Uso
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center">
            É necessário aceitar os termos para continuar usando a plataforma
          </p>
        </DialogHeader>

        <ScrollArea 
          className="px-6 flex-1" 
          style={{ maxHeight: '400px' }}
          onScrollCapture={handleScroll}
        >
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-primary mb-2">1. Aceitação dos Termos</h3>
              <p>
                Ao acessar e usar os serviços da Mobilis Consultas, você concorda em ficar vinculado 
                por estes Termos e Condições de Uso. Se você não concordar com qualquer parte destes 
                termos, não deve usar nossos serviços.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-primary mb-2">2. Descrição dos Serviços</h3>
              <p>
                A Mobilis Consultas oferece serviços de consulta de informações cadastrais, 
                patrimoniais e jurídicas através de nossa plataforma online, incluindo:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Consultas de CPF e CNPJ</li>
                <li>Histórico de veículos por placa</li>
                <li>Consultas de bens imóveis</li>
                <li>Verificação de protestos</li>
                <li>Análise de risco de crédito</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-primary mb-2">3. Responsabilidades do Usuário</h3>
              <p>Você se compromete a:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Fornecer informações verdadeiras e atualizadas</li>
                <li>Usar os serviços apenas para fins legítimos</li>
                <li>Não compartilhar suas credenciais de acesso</li>
                <li>Respeitar os direitos de propriedade intelectual</li>
                <li>Não tentar acessar sistemas não autorizados</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-primary mb-2">4. Privacidade e Proteção de Dados</h3>
              <p>
                Levamos a privacidade a sério e seguimos rigorosamente a Lei Geral de Proteção 
                de Dados (LGPD). Seus dados pessoais são protegidos e utilizados apenas conforme 
                nossa Política de Privacidade.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-primary mb-2">5. Pagamentos e Reembolsos</h3>
              <p>
                Os pagamentos são processados de forma segura através de nossos parceiros certificados. 
                Reembolsos podem ser solicitados dentro de 7 dias úteis para consultas que não foram 
                processadas corretamente.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-primary mb-2">6. Limitação de Responsabilidade</h3>
              <p>
                A Mobilis Consultas não se responsabiliza por danos indiretos, perda de lucros ou 
                consequenciais decorrentes do uso de nossos serviços. Nossa responsabilidade é 
                limitada ao valor pago pelos serviços.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-primary mb-2">7. Alterações nos Termos</h3>
              <p>
                Podemos alterar estes termos a qualquer momento. As alterações entrarão em vigor 
                imediatamente após a publicação. O uso continuado dos serviços constitui aceitação 
                dos novos termos.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-primary mb-2">8. Contato</h3>
              <p>
                Para dúvidas sobre estes termos, entre em contato conosco através do email: 
                juridico@mobilisconsultas.com.br ou pelo telefone (11) 99999-9999.
              </p>
            </section>

            <div className="text-xs text-muted-foreground mt-6 p-4 bg-muted rounded-lg">
              <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
              <p><strong>Versão:</strong> 1.0</p>
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 pt-4 border-t">
          <div className="flex gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={onReject}
              className="min-w-32"
            >
              Negar
            </Button>
            <Button 
              variant="hero" 
              onClick={handleAccept}
              disabled={!hasScrolledToBottom}
              className="min-w-32"
            >
              Aceitar
            </Button>
          </div>
          {!hasScrolledToBottom && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              Role até o final para habilitar o botão "Aceitar"
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;