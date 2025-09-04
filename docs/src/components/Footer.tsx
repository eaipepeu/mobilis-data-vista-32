import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const services = [
    { name: 'Consulta CPF', href: '/dashboard' },
    { name: 'Consulta CNPJ', href: '/dashboard' },
    { name: 'Consulta Veicular', href: '/dashboard' },
    { name: 'Bens Imóveis', href: '/dashboard' },
    { name: 'Protestos', href: '/dashboard' }
  ];

  const company = [
    { name: 'Sobre Nós', href: '/about' },
    { name: 'Planos', href: '#pricing' },
    { name: 'Diferenciais', href: '#differentials' },
    { name: 'Contato', href: '/contact' },
    { name: 'Blog', href: '/blog' }
  ];

  const legal = [
    { name: 'Termos de Uso', href: '#' },
    { name: 'Política de Privacidade', href: '#' },
    { name: 'LGPD', href: '#' },
    { name: 'Certificações', href: '#' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-xl font-semibold">Mobilis Consultas</h3>
              </div>
              <p className="text-white/80 leading-relaxed">
                Tecnologia avançada para consultas profissionais com máxima segurança 
                e conformidade LGPD. Dados criptografados e resultados instantâneos.
              </p>
              <p className="text-sm text-white/60">
                CNPJ: 62.270.941/0001-00
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-secondary" />
                  <a href="https://wa.me/5511981162006" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white">
                    (11) 98116-2006
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span className="text-white/90">contato@mobilisconsultas.com.br</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span className="text-white/90 text-sm">
                    Avenida dos Estados, 432, Vila D'Agostinho<br />
                    Valinhos - SP, CEP: 13274-170
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span className="text-white/90">Suporte 24/7</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 pt-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-smooth"
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Serviços</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link 
                      to={service.href}
                      className="text-white/70 hover:text-white transition-smooth"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Empresa</h3>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      className="text-white/70 hover:text-white transition-smooth"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-3">
                {legal.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      className="text-white/70 hover:text-white transition-smooth"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-white/20 py-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Fique por dentro das novidades
              </h3>
              <p className="text-white/70">
                Receba atualizações sobre novos serviços e dicas importantes
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button variant="consultation" className="px-6">
                Assinar
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 Mobilis Consultas. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-white/60">
              <span>Dados oficiais em tempo real</span>
              <span>•</span>
              <span>Certificação SSL</span>
              <span>•</span>
              <span>Conformidade LGPD</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;