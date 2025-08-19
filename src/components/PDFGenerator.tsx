import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ReportData {
  identificacao: {
    nome: string;
    documento: string;
    situacao: string;
  };
  detran?: {
    placa: string;
    renavam: string;
    multas: Array<{
      data: string;
      descricao: string;
      valor: number;
    }>;
  };
  protestos?: {
    constamProtestos: boolean;
    documentoConsultado: string;
    protestos: Array<{
      estado: string;
      cartoriosProtesto: Array<{
        cidade: string;
        nome: string;
        protesto: Array<{
          dataProtesto: string;
          valorProtestado: string;
        }>;
      }>;
    }>;
  };
  imoveis?: any;
  receitaFederal?: any;
}

export const generatePDF = async (data: ReportData, elementId: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento não encontrado para geração de PDF');
    }

    // Create canvas from element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    // Save PDF
    const fileName = `relatorio-consulta-${data.identificacao.documento}-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    return { success: true, fileName };
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
};