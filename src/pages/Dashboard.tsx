import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  User, 
  Building2, 
  Car, 
  Home, 
  FileText, 
  LogOut,
  CreditCard,
  History,
  Download,
  AlertTriangle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [searchType, setSearchType] = useState('cpf');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated API data
  const mockVehicleData = {
    placa: "ABC1234",
    renavam: "123456789",
    multas: [
      {
        data: "2025-07-15",
        descricao: "Excesso de velocidade",
        valor: 293.47
      },
      {
        data: "2025-06-10", 
        descricao: "Estacionamento proibido",
        valor: 130.16
      }
    ],
    total_multas: 2
  };

  const mockProtestData = {
    constamProtestos: true,
    documentoConsultado: "123.456.789-09",
    protestos: [
      {
        estado: "SP",
        cartoriosProtesto: [
          {
            cidade: "São Paulo",
            nome: "Cartório Central",
            protesto: [
              {"dataProtesto": "2024-11-01", "valorProtestado": "5000.00"},
              {"dataProtesto": "2024-10-15", "valorProtestado": "3000.00"}
            ]
          }
        ],
        totalNumProtestos: 10
      }
    ]
  };

  const consultationTypes = [
    { id: 'cpf', name: 'CPF', icon: User, price: 'R$ 15,00' },
    { id: 'cnpj', name: 'CNPJ', icon: Building2, price: 'R$ 25,00' },
    { id: 'veiculo', name: 'Veículo', icon: Car, price: 'R$ 18,00' },
    { id: 'imoveis', name: 'Imóveis', icon: Home, price: 'R$ 20,00' },
    { id: 'protestos', name: 'Protestos', icon: FileText, price: 'R$ 10,00' }
  ];

  const handleSearch = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (searchType === 'veiculo') {
        setSearchResults({
          type: 'vehicle',
          data: mockVehicleData
        });
      } else if (searchType === 'protestos') {
        setSearchResults({
          type: 'protests',
          data: mockProtestData
        });
      }
      setIsLoading(false);
    }, 2000);
  };

  const formatCurrency = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <img 
                src="/lovable-uploads/d95e1fef-1a1c-4f82-a6c9-5c5655ed82d8.png" 
                alt="Mobilis Consultas" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-semibold">Área do Cliente</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <div className="font-medium">João Silva</div>
                <div className="text-muted-foreground">Créditos: R$ 150,00</div>
              </div>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="consultas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="consultas">Consultas</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="creditos">Créditos</TabsTrigger>
          </TabsList>

          {/* Consultas Tab */}
          <TabsContent value="consultas" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Consultation Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Search className="w-5 h-5" />
                      <span>Nova Consulta</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Consultation Type Selection */}
                    <div>
                      <Label className="text-base font-medium mb-4 block">
                        Tipo de Consulta
                      </Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {consultationTypes.map((type) => {
                          const IconComponent = type.icon;
                          return (
                            <button
                              key={type.id}
                              onClick={() => setSearchType(type.id)}
                              className={`p-4 rounded-lg border-2 transition-smooth ${
                                searchType === type.id
                                  ? 'border-primary bg-primary-light'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              <IconComponent className={`w-6 h-6 mx-auto mb-2 ${
                                searchType === type.id ? 'text-primary' : 'text-muted-foreground'
                              }`} />
                              <div className="text-sm font-medium">{type.name}</div>
                              <div className="text-xs text-muted-foreground">{type.price}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Search Input */}
                    <div className="space-y-2">
                      <Label htmlFor="search">
                        {searchType === 'cpf' && 'CPF'}
                        {searchType === 'cnpj' && 'CNPJ'}
                        {searchType === 'veiculo' && 'Placa do Veículo'}
                        {searchType === 'imoveis' && 'CPF/CNPJ do Proprietário'}
                        {searchType === 'protestos' && 'CPF/CNPJ'}
                      </Label>
                      <Input
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={
                          searchType === 'cpf' ? '000.000.000-00' :
                          searchType === 'cnpj' ? '00.000.000/0000-00' :
                          searchType === 'veiculo' ? 'ABC1234' :
                          'Digite os dados'
                        }
                        className="text-lg"
                      />
                    </div>

                    <Button 
                      onClick={handleSearch}
                      variant="hero" 
                      className="w-full"
                      disabled={isLoading || !searchQuery}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Consultando...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Realizar Consulta
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Results */}
                {searchResults && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Resultado da Consulta</span>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Baixar PDF
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {searchResults.type === 'vehicle' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Placa</Label>
                              <div className="font-semibold">{searchResults.data.placa}</div>
                            </div>
                            <div>
                              <Label>Renavam</Label>
                              <div className="font-semibold">{searchResults.data.renavam}</div>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="font-semibold mb-3 flex items-center">
                              <AlertTriangle className="w-5 h-5 mr-2 text-destructive" />
                              Multas Pendentes ({searchResults.data.total_multas})
                            </h3>
                            <div className="space-y-3">
                              {searchResults.data.multas.map((multa: any, index: number) => (
                                <div key={index} className="bg-muted/50 p-4 rounded-lg">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="font-medium">{multa.descricao}</div>
                                      <div className="text-sm text-muted-foreground">
                                        Data: {new Date(multa.data).toLocaleDateString('pt-BR')}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-bold text-destructive">
                                        {formatCurrency(multa.valor)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {searchResults.type === 'protests' && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            {searchResults.data.constamProtestos ? (
                              <>
                                <AlertTriangle className="w-5 h-5 text-destructive" />
                                <span className="font-semibold text-destructive">
                                  Constam protestos para este documento
                                </span>
                              </>
                            ) : (
                              <>
                                <CheckCircle className="w-5 h-5 text-secondary" />
                                <span className="font-semibold text-secondary">
                                  Nenhum protesto encontrado
                                </span>
                              </>
                            )}
                          </div>

                          <div>
                            <Label>Documento Consultado</Label>
                            <div className="font-semibold">{searchResults.data.documentoConsultado}</div>
                          </div>

                          {searchResults.data.constamProtestos && (
                            <div className="space-y-4">
                              {searchResults.data.protestos.map((protesto: any, index: number) => (
                                <div key={index} className="bg-muted/50 p-4 rounded-lg">
                                  <h4 className="font-semibold mb-3">Estado: {protesto.estado}</h4>
                                  {protesto.cartoriosProtesto.map((cartorio: any, cartorioIndex: number) => (
                                    <div key={cartorioIndex} className="mb-3">
                                      <div className="font-medium">{cartorio.nome}</div>
                                      <div className="text-sm text-muted-foreground mb-2">
                                        {cartorio.cidade}
                                      </div>
                                      <div className="space-y-2">
                                        {cartorio.protesto.map((prot: any, protIndex: number) => (
                                          <div key={protIndex} className="flex justify-between text-sm">
                                            <span>{new Date(prot.dataProtesto).toLocaleDateString('pt-BR')}</span>
                                            <span className="font-medium text-destructive">
                                              {formatCurrency(prot.valorProtestado)}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Minha Conta</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Créditos disponíveis</span>
                      <span className="font-bold text-secondary">R$ 150,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Consultas este mês</span>
                      <span className="font-semibold">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Último acesso</span>
                      <span className="text-sm text-muted-foreground">Hoje, 14:30</span>
                    </div>
                    <Separator />
                    <Button variant="outline" className="w-full">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Adicionar Créditos
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Consultas Recentes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>CPF: 123.456.***-**</span>
                        <span className="text-muted-foreground">Hoje</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Placa: ABC****</span>
                        <span className="text-muted-foreground">Ontem</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CNPJ: 12.345.***/****-**</span>
                        <span className="text-muted-foreground">2 dias</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Histórico Tab */}
          <TabsContent value="historico">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Histórico de Consultas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Seu histórico de consultas aparecerá aqui</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Créditos Tab */}
          <TabsContent value="creditos">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Gerenciar Créditos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Funcionalidades de crédito em desenvolvimento</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;