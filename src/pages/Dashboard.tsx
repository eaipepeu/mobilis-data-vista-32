import { useState, useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import TermsModal from '@/components/TermsModal';
import VerificationModal from '@/components/VerificationModal';
import ConsultationReport from '@/components/ConsultationReport';
import ConsultationResults from '@/components/ConsultationResults';
import ReportTemplate from '@/components/ReportTemplate';
import EnhancedReportTemplate from '@/components/EnhancedReportTemplate';
import { generatePDF, ReportData } from '@/components/PDFGenerator';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [searchType, setSearchType] = useState('cpf');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPaymentVerification, setShowPaymentVerification] = useState(false);
  const [showReportTemplate, setShowReportTemplate] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);
  
  useEffect(() => {
    // Check if user has accepted terms
    const termsAccepted = localStorage.getItem('termsAccepted');
    if (!termsAccepted) {
      setShowTermsModal(true);
    }
  }, []);

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
    { id: 'cpf', name: 'CPF Simples', icon: User, price: 'R$ 3,12', type: 'simples' },
    { id: 'cpf_completo', name: 'CPF Completo', icon: User, price: 'R$ 7,50', type: 'completo' },
    { id: 'cnpj', name: 'CNPJ Simples', icon: Building2, price: 'R$ 8,00', type: 'simples' },
    { id: 'cnpj_completo', name: 'CNPJ Completo', icon: Building2, price: 'R$ 17,00', type: 'completo' },
    { id: 'veiculo', name: 'Veículo Básico', icon: Car, price: 'R$ 17,00', type: 'basico' },
    { id: 'veiculo_master', name: 'Veículo Master', icon: Car, price: 'R$ 35,00', type: 'master' },
    { id: 'detran_mg_multas', name: 'Multas DETRAN MG', icon: FileText, price: 'R$ 20,00', type: 'completo' },
    { id: 'sefaz_sp_debitos', name: 'Débitos SEFAZ SP', icon: CreditCard, price: 'R$ 24,00', type: 'completo' },
    { id: 'detran_rj_multas', name: 'Multas DETRAN RJ', icon: FileText, price: 'R$ 20,00', type: 'completo' },
    { id: 'sncr_imoveis', name: 'SNCR Imóveis', icon: Home, price: 'R$ 26,00', type: 'completo' },
    { id: 'imoveis', name: 'Imóveis', icon: Home, price: 'R$ 85,00' },
    { id: 'protestos', name: 'Protestos Nacional', icon: FileText, price: 'R$ 10,00' }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Erro",
        description: "Digite os dados para consulta",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Get consultation type details
      const selectedType = consultationTypes.find(t => t.id === searchType);
      const baseType = searchType.replace('_completo', '').replace('_master', '');
      
      const { data, error } = await supabase.functions.invoke('infosimples-consultation', {
        body: {
          type: baseType,
          query: searchQuery,
          consultationType: selectedType?.type || 'completo',
          state: 'SP' // Default to SP, could be made configurable
        }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        setSearchResults({
          type: searchType,
          data: data.data
        });
        toast({
          title: "Consulta realizada",
          description: `Créditos utilizados: R$ ${(data.credits_used / 100).toFixed(2)}`
        });
      } else {
        throw new Error(data.error || 'Erro na consulta');
      }
    } catch (error) {
      console.error('Error in consultation:', error);
      toast({
        title: "Erro na consulta",
        description: error.message || "Ocorreu um erro ao realizar a consulta",
        variant: "destructive"
      });
      
      // Fallback to mock data for demo purposes
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
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentRequired = () => {
    setShowPaymentVerification(true);
  };

  const handleTermsAccept = () => {
    localStorage.setItem('termsAccepted', 'true');
    setShowTermsModal(false);
  };

  const handleTermsReject = () => {
    localStorage.removeItem('termsAccepted');
    handleLogout();
  };

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          title: "Erro no logout",
          description: error.message,
          variant: "destructive"
        });
      } else {
        navigate('/login');
      }
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao sair. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPDF = async () => {
    if (!searchResults) return;

    const reportData: ReportData = {
      identificacao: {
        nome: user?.user_metadata?.full_name || 'Usuário',
        documento: searchQuery,
        situacao: 'Consulta realizada',
        dataConsulta: new Date().toISOString()
      },
      consultationType: searchResults.type,
      rawData: searchResults.data
    };

    // Map data based on consultation type
    if (searchResults.type === 'detran_mg_multas') {
      reportData.detranMgMultas = searchResults.data;
      reportData.consultationType = 'DETRAN MG - Multas';
    } else if (searchResults.type === 'sefaz_sp_debitos') {
      reportData.sefazSpDebitos = searchResults.data;
      reportData.consultationType = 'SEFAZ SP - Débitos';
    } else if (searchResults.type === 'detran_rj_multas') {
      reportData.detranRjMultas = searchResults.data;
      reportData.consultationType = 'DETRAN RJ - Multas';
    } else if (searchResults.type === 'sncr_imoveis') {
      reportData.sncrImoveis = searchResults.data;
      reportData.consultationType = 'SNCR - Imóveis';
    } else if (searchResults.type === 'vehicle' || searchResults.type === 'veiculo') {
      reportData.detran = {
        placa: searchResults.data.placa,
        renavam: searchResults.data.renavam,
        multas: searchResults.data.multas
      };
      reportData.consultationType = 'Consulta Veicular';
    } else if (searchResults.type === 'protests' || searchResults.type === 'protestos') {
      reportData.protestos = {
        constamProtestos: searchResults.data.constamProtestos,
        documentoConsultado: searchResults.data.documentoConsultado,
        protestos: searchResults.data.protestos
      };
      reportData.consultationType = 'Consulta de Protestos';
    }

    setShowReportTemplate(true);
    
    // Wait for the report template to render
    setTimeout(async () => {
      const result = await generatePDF(reportData, 'enhanced-report-template');
      if (result.success) {
        toast({
          title: "PDF gerado com sucesso",
          description: `Arquivo ${result.fileName} baixado`
        });
      } else {
        toast({
          title: "Erro ao gerar PDF",
          description: result.error,
          variant: "destructive"
        });
      }
      setShowReportTemplate(false);
    }, 1000);
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
                <div className="font-medium">{user?.user_metadata?.full_name || 'Usuário'}</div>
                <div className="text-muted-foreground">Créditos: R$ 150,00</div>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
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
                        {(searchType === 'cpf' || searchType === 'cpf_completo') && 'CPF'}
                        {(searchType === 'cnpj' || searchType === 'cnpj_completo') && 'CNPJ'}
                        {(searchType === 'veiculo' || searchType === 'veiculo_master') && 'Placa do Veículo'}
                        {(searchType === 'detran_mg_multas' || searchType === 'sefaz_sp_debitos') && 'Placa|Renavam'}
                        {searchType === 'detran_rj_multas' && 'Renavam|CPF/CNPJ'}
                        {searchType === 'sncr_imoveis' && 'Consulta SNCR (Automática)'}
                        {searchType === 'imoveis' && 'CPF/CNPJ do Proprietário'}
                        {searchType === 'protestos' && 'CPF/CNPJ'}
                      </Label>
                       <Input
                        id="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={
                          (searchType === 'cpf' || searchType === 'cpf_completo') ? '000.000.000-00' :
                          (searchType === 'cnpj' || searchType === 'cnpj_completo') ? '00.000.000/0000-00' :
                          (searchType === 'veiculo' || searchType === 'veiculo_master') ? 'ABC1234' :
                          (searchType === 'detran_mg_multas' || searchType === 'sefaz_sp_debitos') ? 'ABC1234|123456789' :
                          searchType === 'detran_rj_multas' ? '123456789|12345678901' :
                          searchType === 'sncr_imoveis' ? 'Consulta automática SP/São Paulo' :
                          'Digite os dados'
                        }
                        className="text-lg"
                        disabled={searchType === 'sncr_imoveis'}
                      />
                    </div>

                    <Button 
                      onClick={handleSearch}
                      variant="hero" 
                      className="w-full"
                      disabled={isLoading || (!searchQuery && searchType !== 'sncr_imoveis')}
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
                  <>
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Resultado da Consulta</span>
                          <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
                            <Download className="w-4 h-4 mr-2" />
                            Baixar PDF
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {(searchResults.type === 'vehicle' || searchResults.type === 'veiculo') && (
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
                                Multas Pendentes ({searchResults.data.total_multas || searchResults.data.multas?.length || 0})
                              </h3>
                              <div className="space-y-3">
                                {(searchResults.data.multas || []).map((multa: any, index: number) => (
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

                        {(searchResults.type === 'protests' || searchResults.type === 'protestos') && (
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
                                {(searchResults.data.protestos || []).map((protesto: any, index: number) => (
                                  <div key={index} className="bg-muted/50 p-4 rounded-lg">
                                    <h4 className="font-semibold mb-3">Estado: {protesto.estado}</h4>
                                    {(protesto.cartoriosProtesto || []).map((cartorio: any, cartorioIndex: number) => (
                                      <div key={cartorioIndex} className="mb-3">
                                        <div className="font-medium">{cartorio.nome}</div>
                                        <div className="text-sm text-muted-foreground mb-2">
                                          {cartorio.cidade}
                                        </div>
                                        <div className="space-y-2">
                                          {(cartorio.protesto || []).map((prot: any, protIndex: number) => (
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

                        {/* Other consultation types */}
                        {(searchResults.type === 'cpf' || searchResults.type === 'cnpj' || searchResults.type === 'imoveis') && (
                          <div className="space-y-4">
                            <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-auto">
                              {JSON.stringify(searchResults.data, null, 2)}
                            </pre>
                          </div>
                        )}
                      </CardContent>
                    </Card>

          {searchResults && (
            <ReportTemplate 
              data={searchResults.data} 
              consultationType={searchType} 
              searchQuery={searchQuery}
            />
          )}
                  </>
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
          <Link to="/payment" className="block">
            <Button variant="outline" className="w-full">
              <CreditCard className="w-4 h-4 mr-2" />
              Adicionar Créditos
            </Button>
          </Link>
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

      {/* Terms Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onAccept={handleTermsAccept}
        onReject={handleTermsReject}
      />

      {/* Payment Verification Modal */}
      <VerificationModal
        isOpen={showPaymentVerification}
        email={user?.email || 'usuario@email.com'}
        type="payment"
        onVerify={(code) => {
          console.log('Código de pagamento verificado:', code);
          setShowPaymentVerification(false);
        }}
        onResend={() => {
          console.log('Reenviando código de pagamento para:', user?.email);
        }}
        onClose={() => setShowPaymentVerification(false)}
      />

      {/* Enhanced Report Template (hidden) */}
      {showReportTemplate && searchResults && (
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <EnhancedReportTemplate
            data={{
              identificacao: {
                nome: user?.user_metadata?.full_name || 'Usuário',
                documento: searchQuery,
                situacao: 'Consulta realizada',
                dataConsulta: new Date().toISOString()
              },
              consultationType: searchResults.type,
              rawData: searchResults.data,
              ...(searchResults.type === 'detran_mg_multas' && {
                detranMgMultas: searchResults.data
              }),
              ...(searchResults.type === 'sefaz_sp_debitos' && {
                sefazSpDebitos: searchResults.data
              }),
              ...(searchResults.type === 'detran_rj_multas' && {
                detranRjMultas: searchResults.data
              }),
              ...(searchResults.type === 'sncr_imoveis' && {
                sncrImoveis: searchResults.data
              }),
              ...(searchResults.type === 'vehicle' && {
                detran: {
                  placa: searchResults.data.placa,
                  renavam: searchResults.data.renavam,
                  multas: searchResults.data.multas
                }
              }),
              ...(searchResults.type === 'protests' && {
                protestos: {
                  constamProtestos: searchResults.data.constamProtestos,
                  documentoConsultado: searchResults.data.documentoConsultado,
                  protestos: searchResults.data.protestos
                }
              })
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;