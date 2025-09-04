import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Download, FileText, Shield, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportTemplateProps {
  data: any;
  consultationType: string;
  searchQuery: string;
}

const ReportTemplate = ({ data, consultationType, searchQuery }: ReportTemplateProps) => {
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

  const generateHTMLReport = () => {
    const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Relatório — Mobilis Consultas</title>

<style>
  :root{
    --font: "Inter", Arial, sans-serif;
    --azul: #0A4A78;
    --verde: #3BA935;
    --cinza: #444;
    --cinza-claro: #e5e7eb;
  }

  body{
    font-family: var(--font);
    color: var(--cinza);
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page{
    width: 210mm;
    min-height: 297mm;
    margin: 0 auto;
    padding: 18mm 16mm 20mm;
    position: relative;
  }

  /* Cabeçalho */
  .header{
    display: flex;
    align-items: center;
    gap: 14px;
    border-bottom: 2px solid var(--cinza-claro);
    padding-bottom: 10px;
    margin-bottom: 16px;
  }
  .header img.logo{
    height: 60px; width: auto;
  }
  .header .title h1{
    margin: 0;
    font-size: 20px;
    color: var(--azul);
  }
  .header .title .sub{
    font-size: 13px;
    color: var(--verde);
    font-weight: 600;
  }

  /* Rodapé */
  .footer{
    position: absolute;
    left: 16mm; right: 16mm; bottom: 12mm;
    display: flex; align-items: center; justify-content: space-between;
    font-size: 11px; color: var(--cinza);
    border-top: 1px solid var(--cinza-claro);
    padding-top: 8px;
  }

  /* Blocos */
  .block{
    border: 1px solid var(--cinza-claro);
    border-radius: 6px;
    padding: 12px 14px;
    margin-bottom: 14px;
  }
  .block h2{
    margin: 0 0 8px;
    font-size: 14px;
    color: var(--azul);
  }

  /* Key-Value */
  .kv{
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 6px 12px;
    font-size: 12px;
  }
  .kv .k{ color: var(--cinza); }
  .kv .v{ font-weight: 600; }

  /* Tabela */
  table{
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  th, td{
    border: 1px solid var(--cinza-claro);
    padding: 6px 10px;
    vertical-align: top;
  }
  th{
    text-align: left;
    background: #f2f6f9;
    font-weight: 700;
    color: var(--azul);
  }

  .section-title{
    margin: 18px 0 8px;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--verde);
  }

  @media print{
    @page{ size: A4; margin: 14mm 12mm 16mm; }
    .page{ padding: 0; width: auto; min-height: auto; margin: 0; }
    .footer{ position: fixed; bottom: 10mm; }
  }
</style>
</head>

<body>
<div class="page">

  <!-- Cabeçalho -->
  <header class="header">
    <img class="logo" src="/lovable-uploads/d95e1fef-1a1c-4f82-a6c9-5c5655ed82d8.png" alt="Logo Mobilis Consultas" />
    <div class="title">
      <h1>Relatório de Consulta ${consultationType.toUpperCase()}</h1>
      <div class="sub">Mobilis Consultas · CNPJ 62.270.941/0001-00</div>
    </div>
  </header>

  <!-- Dados do cliente -->
  <div class="block">
    <h2>Dados do Requerente</h2>
    <div class="kv">
      <div class="k">Documento</div><div class="v">${searchQuery}</div>
      <div class="k">Protocolo</div><div class="v">${authenticCode}</div>
      <div class="k">Data</div><div class="v">${currentDate}</div>
    </div>
  </div>

  <!-- Resumo -->
  <div class="section-title">Resumo Executivo</div>
  <div class="block">
    <p style="margin:0; font-size:12px; line-height:1.5;">
      Consulta realizada com sucesso para ${consultationType} ${searchQuery}. Dados atualizados dos órgãos oficiais.
    </p>
  </div>

  <!-- Consultas -->
  <div class="section-title">Resultados de Consultas</div>
  <div class="block">
    <table>
      <thead>
        <tr>
          <th>Fonte</th>
          <th>Consulta</th>
          <th>Status</th>
          <th>Observações</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mobilis API</td>
          <td>${consultationType.toUpperCase()}</td>
          <td>Concluída</td>
          <td>Dados obtidos com sucesso</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Detalhes -->
  <div class="section-title">Detalhes</div>
  <div class="block">
    <pre style="white-space: pre-wrap; font-size: 11px;">${JSON.stringify(data, null, 2)}</pre>
  </div>

  <!-- Rodapé -->
  <footer class="footer">
    <div>Mobilis Consultas · contato@mobilisconsultas.com.br · (11) 98116-2006</div>
    <div>Página 1 / 1</div>
  </footer>

</div>
</body>
</html>`;
    
    setReportContent(html);
  };

  const handleDownloadPDF = async () => {
    try {
      // Create a temporary element with the HTML content
      const element = document.createElement('div');
      element.id = 'pdf-report-content';
      element.innerHTML = reportContent;
      
      // Apply some basic styling for PDF generation
      element.style.cssText = `
        font-family: Arial, sans-serif;
        color: #333;
        background: white;
        padding: 20px;
        position: relative;
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
      
      const fileName = `relatorio-mobilis-${consultationType}-${searchQuery.replace(/\D/g, '')}-${new Date().toISOString().split('T')[0]}.pdf`;
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
          <span>Relatório Profissional da Consulta</span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={generateHTMLReport}>
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
          <Label htmlFor="report-content">Visualização do Relatório HTML</Label>
          <Textarea
            id="report-content"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="Clique em 'Gerar Relatório' para visualizar o conteúdo HTML"
            rows={20}
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

export default ReportTemplate;