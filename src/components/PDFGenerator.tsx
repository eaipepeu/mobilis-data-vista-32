import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ReportData {
  identificacao: {
    nome: string;
    documento: string;
    situacao: string;
    dataConsulta?: string;
  };
  detran?: any;
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
  detranMgMultas?: any;
  sefazSpDebitos?: any;
  detranRjMultas?: any;
  sncrImoveis?: any;
  consultationType?: string;
  rawData?: any;
}

export const generatePDF = async (data: ReportData, elementId: string) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento não encontrado para geração de PDF');
    }

    // Create canvas from element with better quality settings
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0
    });

    // Create PDF with multiple pages if needed
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Calculate how many pages we need
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95; // 95% to leave margin
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;
    
    const pageHeight = (pdfHeight - 20) / ratio; // 20mm margin
    const totalPages = Math.ceil(imgHeight / pageHeight);

    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        pdf.addPage();
      }
      
      const yOffset = page * pageHeight;
      const canvasSection = document.createElement('canvas');
      const ctx = canvasSection.getContext('2d');
      
      canvasSection.width = imgWidth;
      canvasSection.height = Math.min(pageHeight, imgHeight - yOffset);
      
      if (ctx) {
        ctx.drawImage(
          canvas,
          0, yOffset, imgWidth, canvasSection.height,
          0, 0, imgWidth, canvasSection.height
        );
        
        const imgData = canvasSection.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10, scaledWidth, canvasSection.height * ratio);
      }
    }
    
    // Save PDF
    const consultationType = data.consultationType || 'consulta';
    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = `${consultationType}-${data.identificacao.documento}-${timestamp}.pdf`;
    pdf.save(fileName);
    
    return { success: true, fileName };
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erro desconhecido' };
  }
};