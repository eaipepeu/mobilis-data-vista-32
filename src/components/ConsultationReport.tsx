import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Download, FileText, Shield, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConsultationReportProps {
  data: any;
  consultationType: string;
  searchQuery: string;
}

const ConsultationReport = ({ data, consultationType, searchQuery }: ConsultationReportProps) => {
  const [reportContent, setReportContent] = useState('');
  const { toast } = useToast();

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const authenticCode = `MOB-${Date.now().toString(36).toUpperCase()}`;

  const generateReportContent = () => {
    let content = `RELATÓRIO DE CONSULTA - MOBILIS CONSULTAS\n\n`;
    content += `Código de Autenticação: ${authenticCode}\n`;
    content += `Data/Hora: ${currentDate}\n\n`;
    content += `IDENTIFICAÇÃO:\n`;
    content += `Documento consultado: ${searchQuery}\n`;
    content += `Tipo de consulta: ${consultationType.toUpperCase()}\n\n`;

    if (consultationType === 'veiculo' && data) {
      content += `DADOS VEICULARES:\n`;
      content += `Placa: ${data.placa}\n`;
      content += `RENAVAM: ${data.renavam}\n\n`;
      content += `MULTAS PENDENTES (${data.total_multas}):\n`;
      data.multas?.forEach((multa: any, index: number) => {
        content += `${index + 1}. ${multa.descricao}\n`;
        content += `   Data: ${new Date(multa.data).toLocaleDateString('pt-BR')}\n`;
        content += `   Valor: R$ ${multa.valor.toFixed(2)}\n\n`;
      });
    }

    if (consultationType === 'protestos' && data) {
      content += `PROTESTOS:\n`;
      if (data.constamProtestos) {
        content += `Status: CONSTAM PROTESTOS\n`;
        content += `Documento: ${data.documentoConsultado}\n\n`;
        data.protestos?.forEach((protesto: any, index: number) => {
          content += `${index + 1}. Estado: ${protesto.estado}\n`;
          protesto.cartoriosProtesto?.forEach((cartorio: any) => {
            content += `   Cartório: ${cartorio.nome}\n`;
            content += `   Cidade: ${cartorio.cidade}\n`;
            cartorio.protesto?.forEach((prot: any) => {
              content += `   Data: ${new Date(prot.dataProtesto).toLocaleDateString('pt-BR')}\n`;
              content += `   Valor: R$ ${parseFloat(prot.valorProtestado).toFixed(2)}\n\n`;
            });
          });
        });
      } else {
        content += `Status: NENHUM PROTESTO ENCONTRADO\n`;
      }
    }

    content += `\n═══════════════════════════════════════════════════════════\n`;
    content += `MOBILIS CONSULTAS - Tecnologia avançada para consultas profissionais\n`;
    content += `CNPJ: 62.270.941/0001-00\n`;
    content += `Endereço: Avenida dos Estados, 432, Vila D'Agostinho\n`;
    content += `Valinhos - SP, CEP: 13284-170\n`;
    content += `Contato: contato@mobilisconsultas.com.br\n`;
    content += `Suporte: (19) 99999-9999\n`;
    content += `\nEste documento possui autenticidade e pode ser utilizado como comprovante oficial.\n`;
    content += `Para verificar a autenticidade, use o código: ${authenticCode}\n`;

    setReportContent(content);
  };

  const handleDownloadPDF = async () => {
    try {
      // Create a temporary element for PDF generation
      const element = document.createElement('div');
      element.id = 'pdf-report-content';
      element.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: white; position: relative;">
          <!-- Watermark -->
          <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); 
                      font-size: 72px; color: rgba(59, 130, 246, 0.1); font-weight: bold; z-index: -1; 
                      white-space: nowrap; pointer-events: none;">
            MOBILIS CONSULTAS
          </div>
          
          <!-- Header -->
          <div style="border-bottom: 4px solid #3B82F6; padding-bottom: 20px; margin-bottom: 30px; text-align: center;">
            <img src="/lovable-uploads/d95e1fef-1a1c-4f82-a6c9-5c5655ed82d8.png" 
                 style="height: 60px; margin-bottom: 10px;" />
            <h1 style="color: #3B82F6; margin: 0; font-size: 24px;">RELATÓRIO DE CONSULTA - MOBILIS</h1>
            <p style="color: #666; margin: 5px 0;">Emitido em: ${currentDate}</p>
          </div>
          
          <!-- Content -->
          <div style="white-space: pre-line; line-height: 1.6; font-size: 14px;">
            ${reportContent}
          </div>
          
          <!-- Footer -->
          <div style="margin-top: 40px; padding-top: 20px; border-top: 2px solid #E5E7EB; text-align: center; color: #666; font-size: 12px;">
            <p><strong>Relatório gerado automaticamente por MOBILIS Consultas – Confidencial</strong></p>
            <p>🛡️ Código de autenticação: <strong>${authenticCode}</strong> | 📅 Gerado em ${currentDate}</p>
            <p>Este documento possui validade jurídica e pode ser utilizado como comprovante oficial</p>
          </div>
        </div>
      `;
      
      document.body.appendChild(element);

      // Dynamic import of pdf generation libraries
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).jsPDF;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      const fileName = `relatorio-consulta-${consultationType}-${searchQuery.replace(/\D/g, '')}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      // Remove temporary element
      document.body.removeChild(element);
      
      toast({
        title: "PDF gerado com sucesso",
        description: `Arquivo ${fileName} baixado`
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: "Erro ao gerar PDF",
        description: "Ocorreu um erro ao gerar o PDF. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Relatório da Consulta</span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={generateReportContent}>
              <FileText className="w-4 h-4 mr-2" />
              Gerar Relatório
            </Button>
            <Button 
              variant="hero" 
              size="sm" 
              onClick={handleDownloadPDF}
              disabled={!reportContent}
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="report-content">Conteúdo do Relatório</Label>
          <Textarea
            id="report-content"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="Clique em 'Gerar Relatório' para visualizar o conteúdo"
            rows={15}
            className="mt-2 font-mono text-sm"
          />
        </div>
        
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Código de autenticação: <strong>{authenticCode}</strong></span>
            <Calendar className="w-4 h-4 ml-4" />
            <span>Gerado em: {currentDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultationReport;