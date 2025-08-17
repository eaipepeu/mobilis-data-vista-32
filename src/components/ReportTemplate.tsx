import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Shield, Calendar } from 'lucide-react';

interface ReportData {
  identificacao: {
    nome: string;
    documento: string;
    situacao: string;
  };
  detran?: {
    placa: string;
    renavam: string;
    modelo: string;
    ano: string;
    situacao: string;
    debitos: string;
  }[];
  protestos?: string[];
  imoveis?: string[];
  receita?: {
    situacao: string;
    cnae: string;
    natureza: string;
  };
}

interface ReportTemplateProps {
  data: ReportData;
  onDownload?: () => void;
}

const ReportTemplate = ({ data, onDownload }: ReportTemplateProps) => {
  const [authenticCode] = useState(`MOB-${Date.now().toString(36).toUpperCase()}`);
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  const generatePDF = () => {
    // This would integrate with the backend Python service for PDF generation
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-page { page-break-inside: avoid; }
          body { font-size: 12px; }
        }
      `}</style>

      {/* Header */}
      <div className="border-b-4 border-primary p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/d95e1fef-1a1c-4f82-a6c9-5c5655ed82d8.png" 
              alt="Mobilis Consultas" 
              className="h-16 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary">
                Relatório de Consulta - MOBILIS
              </h1>
              <p className="text-muted-foreground">
                Emitido em: {currentDate}
              </p>
            </div>
          </div>
          <div className="no-print space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <FileText className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="hero" onClick={generatePDF}>
              <Download className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="space-y-8 px-6">
        {/* Section 1 - Identification */}
        <Card className="print-page">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary border-b-2 border-primary pb-2">
              <span>🔹</span>
              <span>Seção 1 – Identificação</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Nome/Razão Social:</strong>
                <div>{data.identificacao.nome}</div>
              </div>
              <div>
                <strong>CPF/CNPJ:</strong>
                <div>{data.identificacao.documento}</div>
              </div>
            </div>
            <div>
              <strong>Situação Cadastral:</strong>
              <div className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                data.identificacao.situacao === 'Ativo' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {data.identificacao.situacao}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2 - DETRAN */}
        <Card className="print-page">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary border-b-2 border-primary pb-2">
              <span>🚗</span>
              <span>Seção 2 – DETRAN</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.detran && data.detran.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="border border-gray-300 p-2">Placa</th>
                      <th className="border border-gray-300 p-2">RENAVAM</th>
                      <th className="border border-gray-300 p-2">Modelo</th>
                      <th className="border border-gray-300 p-2">Ano</th>
                      <th className="border border-gray-300 p-2">Situação</th>
                      <th className="border border-gray-300 p-2">Débitos (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.detran.map((veiculo, index) => (
                      <tr key={index} className="even:bg-gray-50">
                        <td className="border border-gray-300 p-2">{veiculo.placa}</td>
                        <td className="border border-gray-300 p-2">{veiculo.renavam}</td>
                        <td className="border border-gray-300 p-2">{veiculo.modelo}</td>
                        <td className="border border-gray-300 p-2">{veiculo.ano}</td>
                        <td className="border border-gray-300 p-2">{veiculo.situacao}</td>
                        <td className="border border-gray-300 p-2">{veiculo.debitos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                ✔ Nenhum veículo encontrado
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 3 - Protests */}
        <Card className="print-page">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary border-b-2 border-primary pb-2">
              <span>📜</span>
              <span>Seção 3 – Protestos em Cartório</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.protestos && data.protestos.length > 0 ? (
              <ul className="space-y-2">
                {data.protestos.map((protesto, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span>➡</span>
                    <span>{protesto}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                ✔ Nenhum protesto encontrado
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 4 - Properties */}
        <Card className="print-page">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary border-b-2 border-primary pb-2">
              <span>🏠</span>
              <span>Seção 4 – Imóveis Vinculados</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.imoveis && data.imoveis.length > 0 ? (
              <ul className="space-y-2">
                {data.imoveis.map((imovel, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span>➡</span>
                    <span>{imovel}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                ✔ Nenhum imóvel encontrado
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 5 - Federal Revenue */}
        {data.receita && (
          <Card className="print-page">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary border-b-2 border-primary pb-2">
                <span>🏛</span>
                <span>Seção 5 – Receita Federal</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <strong>Situação Cadastral:</strong>
                <div>{data.receita.situacao}</div>
              </div>
              <div>
                <strong>CNAE:</strong>
                <div>{data.receita.cnae}</div>
              </div>
              <div>
                <strong>Natureza Jurídica:</strong>
                <div>{data.receita.natureza}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <Separator className="my-8" />
      <div className="text-center py-6 text-sm text-muted-foreground border-t-2 border-gray-200">
        <div className="space-y-2">
          <p className="font-medium">
            Relatório gerado automaticamente por MOBILIS Consultas – Confidencial
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Código de autenticação:</span>
              <strong>{authenticCode}</strong>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Gerado em {currentDate}</span>
            </div>
          </div>
          <p className="text-xs">
            Este documento possui validade jurídica e pode ser utilizado como comprovante oficial
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportTemplate;