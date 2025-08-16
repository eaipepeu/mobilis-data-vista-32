import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, User, ArrowRight, Search, TrendingUp } from 'lucide-react';

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: "LGPD e Consultas: Como Protegemos Seus Dados",
    excerpt: "Entenda como a Mobilis Consultas garante total conformidade com a Lei Geral de Proteção de Dados e protege suas informações pessoais.",
    image: "/src/assets/security-icon.jpg",
    category: "Segurança",
    author: "Equipe Mobilis",
    date: "15 de Janeiro, 2025",
    readTime: "5 min"
  };

  const posts = [
    {
      id: 2,
      title: "Como Interpretar Consultas de CPF: Guia Completo",
      excerpt: "Saiba como analisar corretamente os dados de uma consulta de CPF e tomar decisões mais seguras.",
      category: "Tutorial",
      author: "Dr. Carlos Silva",
      date: "12 de Janeiro, 2025",
      readTime: "8 min"
    },
    {
      id: 3,
      title: "Protestos: O que São e Como Consultar",
      excerpt: "Tudo que você precisa saber sobre protestos, como consultá-los e como isso afeta o score de crédito.",
      category: "Educação",
      author: "Ana Paula Santos",
      date: "10 de Janeiro, 2025",
      readTime: "6 min"
    },
    {
      id: 4,
      title: "Histórico Veicular: Evite Problemas na Compra",
      excerpt: "Descubra como um histórico completo do veículo pode evitar surpresas desagradáveis na compra.",
      category: "Dicas",
      author: "Roberto Mendes",
      date: "8 de Janeiro, 2025",
      readTime: "7 min"
    },
    {
      id: 5,
      title: "CNPJ: Análise de Idoneidade Empresarial",
      excerpt: "Como avaliar a confiabilidade de uma empresa através de consultas de CNPJ detalhadas.",
      category: "Negócios",
      author: "Maria Helena",
      date: "5 de Janeiro, 2025",
      readTime: "10 min"
    },
    {
      id: 6,
      title: "Tendências em Consultas Digitais para 2025",
      excerpt: "As principais inovações e tendências que moldarão o mercado de consultas digitais.",
      category: "Tendências",
      author: "Equipe Mobilis",
      date: "3 de Janeiro, 2025",
      readTime: "4 min"
    }
  ];

  const categories = ["Todos", "Segurança", "Tutorial", "Educação", "Dicas", "Negócios", "Tendências"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog Mobilis
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Insights, dicas e novidades sobre consultas, proteção de dados e segurança digital
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                <Input
                  placeholder="Buscar artigos..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-primary" />
                Artigo em Destaque
              </h2>
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <Badge variant="secondary" className="mb-4">
                      {featuredPost.category}
                    </Badge>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground text-lg mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <span>{featuredPost.readTime} de leitura</span>
                    </div>
                    <Button variant="hero" className="group">
                      Ler Artigo
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-4 justify-center">
                {categories.map((category, index) => (
                  <Button
                    key={index}
                    variant={index === 0 ? "default" : "outline"}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Últimos Artigos
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-subtle"></div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {post.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-tight">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full group">
                        Ler Mais
                        <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Carregar Mais Artigos
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Fique por Dentro das Novidades
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Receba os melhores conteúdos sobre consultas, segurança digital e proteção 
              de dados diretamente no seu email.
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <Input
                placeholder="Seu email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="secondary">
                Inscrever
              </Button>
            </div>
            <p className="text-xs text-white/70 mt-4">
              Enviamos apenas conteúdo relevante. Sem spam.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;