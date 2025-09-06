import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Shield, User, AlertTriangle, CheckCircle, Upload } from 'lucide-react';

interface IdentityValidationProps {
  onValidationSuccess: (isValid: boolean) => void;
  requiredDocument?: string;
}

const IdentityValidation = ({ onValidationSuccess, requiredDocument }: IdentityValidationProps) => {
  const [validationData, setValidationData] = useState({
    fullName: '',
    document: '',
    birthDate: '',
    motherName: '',
    selfieFile: null as File | null
  });
  const [isValidating, setIsValidating] = useState(false);
  const [validationStep, setValidationStep] = useState(1);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Arquivo inválido",
          description: "Por favor, envie apenas imagens (JPG, PNG, etc.)",
          variant: "destructive"
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "Arquivo muito grande",
          description: "A imagem deve ter no máximo 5MB",
          variant: "destructive"
        });
        return;
      }

      setValidationData({ ...validationData, selfieFile: file });
    }
  };

  const handleValidation = async () => {
    if (!validationData.fullName || !validationData.document || !validationData.birthDate) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    // Validate document format
    if (requiredDocument && validationData.document !== requiredDocument) {
      toast({
        title: "Documento não confere",
        description: "O documento informado deve ser o mesmo que será consultado",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);

    try {
      // Simulate identity validation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In production, this would integrate with identity verification services
      const isValid = Math.random() > 0.1; // 90% success rate for demo
      
      if (isValid) {
        toast({
          title: "Identidade verificada",
          description: "Sua identidade foi confirmada com sucesso",
        });
        onValidationSuccess(true);
      } else {
        toast({
          title: "Falha na verificação",
          description: "Não foi possível confirmar sua identidade. Verifique os dados e tente novamente.",
          variant: "destructive"
        });
        onValidationSuccess(false);
      }
    } catch (error) {
      toast({
        title: "Erro na validação",
        description: "Ocorreu um erro durante a verificação. Tente novamente.",
        variant: "destructive"
      });
      onValidationSuccess(false);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-xl">
          <Shield className="w-6 h-6 text-primary" />
          Validação de Identidade
        </CardTitle>
        <p className="text-muted-foreground">
          Para sua segurança, precisamos confirmar que você é a pessoa que está sendo consultada
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {validationStep === 1 && (
          <>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Por que validamos sua identidade?</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Proteção contra fraudes e uso indevido</li>
                    <li>• Conformidade com a LGPD</li>
                    <li>• Garantia de que apenas você acesse seus dados</li>
                    <li>• Segurança em todas as consultas</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo *</Label>
                <Input
                  id="fullName"
                  placeholder="Seu nome completo"
                  value={validationData.fullName}
                  onChange={(e) => setValidationData({...validationData, fullName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="document">CPF *</Label>
                <Input
                  id="document"
                  placeholder="000.000.000-00"
                  value={validationData.document}
                  onChange={(e) => setValidationData({...validationData, document: e.target.value})}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Data de Nascimento *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={validationData.birthDate}
                  onChange={(e) => setValidationData({...validationData, birthDate: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherName">Nome da Mãe (opcional)</Label>
                <Input
                  id="motherName"
                  placeholder="Nome completo da mãe"
                  value={validationData.motherName}
                  onChange={(e) => setValidationData({...validationData, motherName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="selfie">Selfie para Verificação (opcional)</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                {validationData.selfieFile ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>Arquivo enviado: {validationData.selfieFile.name}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Clique para enviar uma selfie (opcional)
                    </p>
                  </div>
                )}
                <input
                  id="selfie"
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('selfie')?.click()}
                  className="mt-2"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Enviar Selfie
                </Button>
              </div>
            </div>

            <Button
              onClick={handleValidation}
              disabled={isValidating || !validationData.fullName || !validationData.document || !validationData.birthDate}
              className="w-full"
              variant="hero"
            >
              {isValidating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Validando Identidade...
                </>
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Validar Identidade
                </>
              )}
            </Button>
          </>
        )}

        <div className="text-xs text-muted-foreground text-center">
          <p>Seus dados são protegidos e utilizados apenas para verificação de identidade.</p>
          <p>Conforme nossa Política de Privacidade e termos da LGPD.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IdentityValidation;