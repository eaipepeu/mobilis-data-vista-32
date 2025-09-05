import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageCircle,
  ArrowLeft,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const whatsappNumber = "5511999999999"; // Replace with actual WhatsApp number
  const whatsappMessage = `Olá! Gostaria de saber mais sobre os serviços da Mobilis Consultas.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Link>
              <div className="hidden sm:block">
                <img 
                  src="/lovable-uploads/d95e1fef-1a1c-4f82-a6c9-5c5655ed82d8.png" 
                  alt="Mobilis Consultas" 
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Entre em Contato
            </h1>
            <p className="text-xl text-muted-foreground">
              Nossa equipe está pronta para atender você
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Envie sua mensagem</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Descreva como podemos ajudá-lo..."
                      maxLength={250}
                      rows={4}
                      required
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {formData.description.length}/250 caracteres
                    </div>
                  </div>

                  <Button type="submit" variant="hero" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>

                {/* WhatsApp Contact */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Prefere falar diretamente conosco?
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button variant="consultation" className="w-full">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Conversar no WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Telefone</div>
                      <div className="text-muted-foreground">(11) 99999-9999</div>
                      <div className="text-sm text-muted-foreground">
                        Ligações e WhatsApp
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">E-mail</div>
                       <div className="text-muted-foreground">
                         contato@mobilisconsultas.com.br
                       </div>
                      <div className="text-sm text-muted-foreground">
                        Resposta em até 2 horas
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Endereço</div>
                      <div className="text-muted-foreground">
                        São Paulo - SP<br />
                        Atendimento presencial mediante agendamento
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Horário de Atendimento</div>
                      <div className="text-muted-foreground">
                        Segunda a Sexta: 8h às 18h<br />
                        Sábado: 8h às 12h<br />
                        <span className="text-secondary font-medium">
                          Plataforma 24/7 online
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Perguntas Frequentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-semibold text-sm mb-1">
                      Como funcionam os créditos?
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Cada consulta consome créditos equivalentes ao valor da consulta. 
                      Você pode adquirir pacotes pré-pagos ou planos mensais.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-sm mb-1">
                      Os dados são atualizados?
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Sim! Todas as consultas são feitas em tempo real nos órgãos 
                      oficiais, garantindo informações sempre atualizadas.
                    </div>
                  </div>

                  <div>
                    <div className="font-semibold text-sm mb-1">
                      Posso parcelar débitos?
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Sim! Oferecemos parcelamento de multas e IPVA em até 12x, 
                      exclusividade da Mobilis Consultas.
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-primary text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">
                    Precisa de uma consulta urgente?
                  </h3>
                  <p className="text-white/90 mb-4">
                    Acesse nossa plataforma 24/7 e obtenha resultados instantâneos
                  </p>
                  <Link to="/dashboard">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                      Fazer Consulta Agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;