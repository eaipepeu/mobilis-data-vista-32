import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Building, Car, Home, Phone, Mail, MapPin, Calendar, CreditCard } from 'lucide-react';

interface ConsultationResultsProps {
  data: any;
  consultationType: string;
}

const ConsultationResults = ({ data, consultationType }: ConsultationResultsProps) => {
  const renderCPFResults = (cpfData: any) => {
    return (
      <div className="space-y-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}>
        {/* Dados Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="w-5 h-5 text-primary" />
              Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-muted-foreground">Nome Completo:</span>
                <p className="font-medium">{cpfData.retorno?.nome || 'Não informado'}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">CPF:</span>
                <p className="font-medium">{cpfData.retorno?.cpf || 'Não informado'}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Sexo:</span>
                <p className="font-medium">{cpfData.retorno?.sexo || 'Não informado'}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Data de Nascimento:</span>
                <p className="font-medium">{cpfData.retorno?.dataNascimento || 'Não informado'}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Idade:</span>
                <p className="font-medium">{cpfData.retorno?.idade ? `${cpfData.retorno.idade} anos` : 'Não informado'}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Nome da Mãe:</span>
                <p className="font-medium">{cpfData.retorno?.nomeMae || 'Não informado'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endereços */}
        {cpfData.retorno?.enderecos && cpfData.retorno.enderecos.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="w-5 h-5 text-primary" />
                Endereços Cadastrados
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cpfData.retorno.enderecos.map((endereco: any, index: number) => (
                <div key={index} className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium">
                    {endereco.logradouro}, {endereco.numero}
                    {endereco.complemento && ` - ${endereco.complemento}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {endereco.bairro}, {endereco.cidade} - {endereco.uf}
                  </p>
                  <p className="text-sm text-muted-foreground">CEP: {endereco.cep}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Telefones */}
        {cpfData.retorno?.telefones && cpfData.retorno.telefones.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Phone className="w-5 h-5 text-primary" />
                Telefones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {cpfData.retorno.telefones.map((telefone: any, index: number) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <span className="font-medium">{telefone.telefoneComDDD}</span>
                    <div className="flex gap-2">
                      <Badge variant={telefone.whatsApp ? "default" : "secondary"}>
                        {telefone.whatsApp ? "WhatsApp" : "Telefone"}
                      </Badge>
                      {telefone.operadora && (
                        <Badge variant="outline">{telefone.operadora}</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Emails */}
        {cpfData.retorno?.emails && cpfData.retorno.emails.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="w-5 h-5 text-primary" />
                E-mails
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cpfData.retorno.emails.map((email: any, index: number) => (
                <p key={index} className="font-medium mb-2">{email.enderecoEmail}</p>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Informações Financeiras */}
        {(cpfData.retorno?.rendaEstimada || cpfData.retorno?.rendaFaixaSalarial) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="w-5 h-5 text-primary" />
                Informações Financeiras
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {cpfData.retorno.rendaEstimada && (
                <div>
                  <span className="font-semibold text-muted-foreground">Renda Estimada:</span>
                  <p className="font-medium">{cpfData.retorno.rendaEstimada}</p>
                </div>
              )}
              {cpfData.retorno.rendaFaixaSalarial && (
                <div>
                  <span className="font-semibold text-muted-foreground">Faixa Salarial:</span>
                  <p className="font-medium">{cpfData.retorno.rendaFaixaSalarial}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderCNPJResults = (cnpjData: any) => {
    return (
      <div className="space-y-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}>
        {/* Dados da Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building className="w-5 h-5 text-primary" />
              Dados da Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-muted-foreground">CNPJ:</span>
                <p className="font-medium">{cnpjData.retorno?.cnpj || 'Não informado'}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Razão Social:</span>
                <p className="font-medium">{cnpjData.retorno?.razaoSocial || 'Não informado'}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Nome Fantasia:</span>
                <p className="font-medium">{cnpjData.retorno?.nomeFantasia || 'Não informado'}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Data de Fundação:</span>
                <p className="font-medium">{cnpjData.retorno?.dataFundacao || 'Não informado'}</p>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Situação Cadastral:</span>
                <Badge variant={cnpjData.retorno?.situacaoCadastral === 'ATIVA' ? 'default' : 'destructive'}>
                  {cnpjData.retorno?.situacaoCadastral || 'Não informado'}
                </Badge>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground">Porte:</span>
                <p className="font-medium">{cnpjData.retorno?.porte || 'Não informado'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Atividade Econômica */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Atividade Econômica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-muted-foreground">CNAE Principal:</span>
                <p className="font-medium">
                  {cnpjData.retorno?.cnaeCodigo} - {cnpjData.retorno?.cnaeDescricao}
                </p>
              </div>
              {cnpjData.retorno?.cnaEsSecundarios && cnpjData.retorno.cnaEsSecundarios.length > 0 && (
                <div>
                  <span className="font-semibold text-muted-foreground">CNAEs Secundários:</span>
                  <div className="mt-2 space-y-1">
                    {cnpjData.retorno.cnaEsSecundarios.map((cnae: any, index: number) => (
                      <p key={index} className="text-sm">
                        {cnae.cnaeCodigoSecundario} - {cnae.cnaeDescricaoSecundario}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Sócios */}
        {cnpjData.retorno?.socios && cnpjData.retorno.socios.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quadro Societário</CardTitle>
            </CardHeader>
            <CardContent>
              {cnpjData.retorno.socios.map((socio: any, index: number) => (
                <div key={index} className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold text-muted-foreground">Nome:</span>
                      <p className="font-medium">{socio.nome}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-muted-foreground">Documento:</span>
                      <p className="font-medium">{socio.documento}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-muted-foreground">Participação:</span>
                      <p className="font-medium">{socio.percentualParticipacao}%</p>
                    </div>
                    <div>
                      <span className="font-semibold text-muted-foreground">Cargo:</span>
                      <p className="font-medium">{socio.cargo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderVehicleResults = (vehicleData: any) => {
    return (
      <div className="space-y-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Car className="w-5 h-5 text-primary" />
              Informações do Veículo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vehicleData.retorno ? (
                <div className="p-4 bg-muted/50 rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {JSON.stringify(vehicleData.retorno, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-muted-foreground">Nenhuma informação de veículo encontrada.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderRegularidadeResults = (regularidadeData: any) => {
    return (
      <div className="space-y-6" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px' }}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building className="w-5 h-5 text-primary" />
              Regularidade da Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {regularidadeData.retorno ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-muted-foreground">Transportador:</span>
                  <p className="font-medium">{regularidadeData.retorno.transportador || 'Não informado'}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Documento:</span>
                  <p className="font-medium">{regularidadeData.retorno.documento || 'Não informado'}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">RNTRC:</span>
                  <p className="font-medium">{regularidadeData.retorno.rntrc || 'Não informado'}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Situação:</span>
                  <Badge variant={regularidadeData.retorno.apto ? 'default' : 'destructive'}>
                    {regularidadeData.retorno.situacao || 'Não informado'}
                  </Badge>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Status:</span>
                  <p className="font-medium">{regularidadeData.retorno.status || 'Não informado'}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Categoria:</span>
                  <p className="font-medium">{regularidadeData.retorno.categoria || 'Não informado'}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhuma informação de regularidade encontrada.</p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderResults = () => {
    switch (consultationType.toLowerCase()) {
      case 'cpf':
        return renderCPFResults(data);
      case 'cnpj':
        return renderCNPJResults(data);
      case 'veiculo':
        return renderVehicleResults(data);
      case 'regularidade':
        return renderRegularidadeResults(data);
      default:
        return (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Tipo de consulta não reconhecido.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Resultado da Consulta - {consultationType.toUpperCase()}
        </h3>
        <p className="text-sm text-muted-foreground">
          Consulta realizada em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
        </p>
      </div>
      
      <Separator />
      
      {renderResults()}
    </div>
  );
};

export default ConsultationResults;