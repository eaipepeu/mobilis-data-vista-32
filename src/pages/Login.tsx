import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

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
            <form className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
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
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirme sua senha"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
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

              <Link to="/dashboard">
                <Button variant="hero" className="w-full">
                  {isLogin ? 'Entrar' : 'Criar conta'}
                </Button>
              </Link>
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
    </div>
  );
};

export default Login;