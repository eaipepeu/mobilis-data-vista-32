import { Button } from '@/components/ui/button';
import { Search, Shield, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-bg.jpg';

const Hero = () => {
  const features = [
    'Consultas em tempo real',
    'Dados seguros e confiáveis',
    'Plataforma intuitiva',
    'Suporte especializado'
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-trust/70"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Consultas Completas e
                <span className="block text-secondary"> Instantâneas</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Acesse informações de CPF, CNPJ, veículos e bens imóveis de forma rápida, 
                segura e confiável. A plataforma mais completa do mercado.
              </p>
            </div>

            {/* Features list */}
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/dashboard">
                <Button variant="consultation" size="lg" className="w-full sm:w-auto">
                  <Search className="w-5 h-5 mr-2" />
                  Fazer Consulta Agora
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                <Shield className="w-5 h-5 mr-2" />
                Ver Planos
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 pt-6 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">3K+</div>
                <div className="text-sm text-white/80">Consultas realizadas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">99.9%</div>
                <div className="text-sm text-white/80">Disponibilidade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">24/7</div>
                <div className="text-sm text-white/80">Suporte online</div>
              </div>
            </div>
          </div>

          {/* Quick Search Card */}
          <div className="lg:mt-0 mt-8">
            <div className="bg-white rounded-2xl shadow-elegant p-8 space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Consulta Rápida
                </h3>
                <p className="text-muted-foreground">
                  Teste nossa plataforma gratuitamente
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tipo de Consulta
                  </label>
                  <select className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>CPF</option>
                    <option>CNPJ</option>
                    <option>Placa do Veículo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Digite os dados
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 000.000.000-00"
                    className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <Link to="/dashboard" className="block">
                  <Button variant="hero" className="w-full">
                    <Search className="w-5 h-5 mr-2" />
                    Consultar Agora
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground text-center">
                  Primeira consulta gratuita para novos usuários
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;