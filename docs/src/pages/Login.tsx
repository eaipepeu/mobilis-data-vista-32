import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import VerificationModal from '@/components/VerificationModal';
import TermsModal from '@/components/TermsModal';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import { useAuth } from '@/hooks/useAuth';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signUp, signIn } = useAuth();
  const passwordValidation = usePasswordValidation(password);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Erro no login",
            description: error.message,
            variant: "destructive"
          });
        }
      } else {
        // Signup
        if (!passwordValidation.isValid) {
          toast({
            title: "Senha inválida",
            description: "Por favor, atenda a todos os requisitos de senha",
            variant: "destructive"
          });
          return;
        }
        
        if (password !== confirmPassword) {
          toast({
            title: "Senhas não coincidem",
            description: "A confirmação de senha deve ser idêntica à senha",
            variant: "destructive"
          });
          return;
        }
        
        if (!termsAccepted) {
          toast({
            title: "Termos não aceitos",
            description: "Você deve aceitar os termos de uso para continuar",
            variant: "destructive"
          });
          return;
        }

        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: "Erro no cadastro",
            description: error.message,
            variant: "destructive"
          });
        } else {
          setShowVerificationModal(true);
        }
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-white hover:text-secondary transition-smooth mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao início
        </Link>

        <Card className="shadow-elegant">
          <CardHeader className="text-center">
            <div className="mb-4">
              <img 
                src="/lovable-uploads/d95e1fef-1a1c-4f82-a6c9-5c5655ed82d8.png" 
                alt="Mobilis Consultas" 
                className="h-12 w-auto mx-auto"
              />
            </div>
            <CardTitle className="text-2xl">
              {isLogin ? 'Acesse sua conta' : 'Criar conta'}
            </CardTitle>
            <p className="text-muted-foreground">
              {isLogin 
                ? 'Entre com seus dados para acessar a plataforma'
                : 'Crie sua conta para começar a consultar'
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {!isLogin && <PasswordStrengthIndicator validation={passwordValidation} password={password} />}
              </div>

              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        className="pl-10 pr-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {password && confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-destructive">As senhas não coincidem</p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      />
                      <div className="text-xs leading-relaxed">
                        <Label htmlFor="terms" className="cursor-pointer">
                          Declaro que li e aceito os{' '}
                          <button
                            type="button"
                            onClick={() => setShowTermsModal(true)}
                            className="text-primary hover:underline"
                          >
                            Termos de Uso, Política de Privacidade e Lei Geral de Proteção de Dados (LGPD)
                          </button>
                        </Label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded border-border" />
                    <span>Lembrar de mim</span>
                  </label>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Esqueci minha senha
                  </Button>
                </div>
              )}

              <Button 
                type="submit"
                variant="hero" 
                className="w-full"
                disabled={isLoading || (!isLogin && (!passwordValidation.isValid || !termsAccepted))}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {isLogin ? 'Entrando...' : 'Criando conta...'}
                  </>
                ) : (
                  isLogin ? 'Entrar' : 'Criar conta'
                )}
              </Button>
            </form>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              </p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="p-0 h-auto"
              >
                {isLogin ? 'Criar conta gratuita' : 'Fazer login'}
              </Button>
            </div>

            {isLogin && (
              <div className="text-center pt-4">
                <p className="text-xs text-muted-foreground">
                  Primeira consulta gratuita para novos usuários
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <VerificationModal
        isOpen={showVerificationModal}
        email={email}
        type="registration"
        onVerify={(code) => {
          console.log('Código verificado:', code);
          setShowVerificationModal(false);
          navigate('/dashboard');
        }}
        onResend={() => {
          console.log('Reenviando código para:', email);
        }}
        onClose={() => setShowVerificationModal(false)}
      />

      <TermsModal
        isOpen={showTermsModal}
        onAccept={() => {
          setTermsAccepted(true);
          setShowTermsModal(false);
        }}
        onReject={() => setShowTermsModal(false)}
      />
    </div>
  );
};

export default Login;