import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SupportFloat = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="lg"
        className="rounded-full w-16 h-16 shadow-lg hover:scale-110 transition-transform"
        onClick={() => window.open('mailto:suporte@mobilisconsultas.com.br', '_blank')}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default SupportFloat;