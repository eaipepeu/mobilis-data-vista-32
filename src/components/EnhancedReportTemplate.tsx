import { ReportData } from './PDFGenerator';

interface EnhancedReportTemplateProps {
  data: ReportData;
}

const EnhancedReportTemplate = ({ data }: EnhancedReportTemplateProps) => {
  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numValue || 0);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateStr;
    }
  };

  return (
    <div id="enhanced-report-template" className="bg-white p-8 max-w-4xl mx-auto text-sm">
      {/* Header */}
      <div className="text-center mb-8 border-b pb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">RELATÓRIO DE CONSULTA</h1>
        <h2 className="text-lg text-gray-600">Mobilis Consultas</h2>
        <p className="text-sm text-gray-500 mt-2">
          Relatório gerado em: {formatDate(data.identificacao.dataConsulta || new Date().toISOString())}
        </p>
      </div>

      {/* Identification Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 bg-gray-100 p-2 rounded">Identificação</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Nome:</strong> {data.identificacao.nome}
          </div>
          <div>
            <strong>Documento:</strong> {data.identificacao.documento}
          </div>
          <div>
            <strong>Situação:</strong> {data.identificacao.situacao}
          </div>
          <div>
            <strong>Tipo de Consulta:</strong> {data.consultationType || 'Consulta Padrão'}
          </div>
        </div>
      </div>

      {/* DETRAN MG Multas */}
      {data.detranMgMultas && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 bg-red-100 p-2 rounded">Multas DETRAN MG</h3>
          {data.detranMgMultas.data && data.detranMgMultas.data.length > 0 ? (
            <div className="space-y-3">
              {data.detranMgMultas.data.map((multa: any, index: number) => (
                <div key={index} className="border border-gray-300 p-3 rounded">
                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>AIT:</strong> {multa.ait || 'N/A'}</div>
                    <div><strong>Placa:</strong> {multa.placa || 'N/A'}</div>
                    <div><strong>Data Infração:</strong> {formatDate(multa.data_infracao)}</div>
                    <div><strong>Valor:</strong> {formatCurrency(multa.valor || 0)}</div>
                    <div className="col-span-2"><strong>Descrição:</strong> {multa.descricao || 'N/A'}</div>
                    <div className="col-span-2"><strong>Local:</strong> {multa.local || 'N/A'}</div>
                    <div><strong>Órgão Autuador:</strong> {multa.orgao_autuador || 'N/A'}</div>
                    <div><strong>Situação:</strong> {multa.situacao || 'N/A'}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhuma multa encontrada no DETRAN MG.</p>
          )}
        </div>
      )}

      {/* SEFAZ SP Débitos */}
      {data.sefazSpDebitos && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 bg-yellow-100 p-2 rounded">Débitos SEFAZ SP</h3>
          {data.sefazSpDebitos.data && data.sefazSpDebitos.data.length > 0 ? (
            <div className="space-y-4">
              {data.sefazSpDebitos.data.map((debito: any, index: number) => (
                <div key={index} className="border border-gray-300 p-4 rounded">
                  <div className="grid grid-cols-2 gap-3">
                    <div><strong>Placa:</strong> {debito.placa || 'N/A'}</div>
                    <div><strong>Renavam:</strong> {debito.renavam || 'N/A'}</div>
                    <div><strong>Marca:</strong> {debito.marca || 'N/A'}</div>
                    <div><strong>Modelo:</strong> {debito.tipo || 'N/A'}</div>
                    <div><strong>Ano Fabricação:</strong> {debito.ano_fabricacao || 'N/A'}</div>
                    <div><strong>Combustível:</strong> {debito.combustivel || 'N/A'}</div>
                    <div className="col-span-2"><strong>Valor Total Débitos:</strong> {formatCurrency(debito.valor_total_debitos || 0)}</div>
                  </div>
                  
                  {debito.ipva && (
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <h4 className="font-semibold mb-2">IPVA</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><strong>Base Cálculo:</strong> {formatCurrency(debito.ipva.base_calculo || 0)}</div>
                        <div><strong>Alíquota:</strong> {debito.ipva.aliquota || 'N/A'}%</div>
                        <div><strong>Valor Devido:</strong> {formatCurrency(debito.ipva.valor || 0)}</div>
                        <div><strong>Saldo Devido:</strong> {formatCurrency(debito.ipva.saldo_devido || 0)}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhum débito encontrado no SEFAZ SP.</p>
          )}
        </div>
      )}

      {/* DETRAN RJ Multas */}
      {data.detranRjMultas && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 bg-blue-100 p-2 rounded">Multas DETRAN RJ</h3>
          {data.detranRjMultas.data && data.detranRjMultas.data.length > 0 ? (
            <div className="space-y-3">
              {data.detranRjMultas.data.map((multa: any, index: number) => (
                <div key={index} className="border border-gray-300 p-3 rounded">
                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>AIT:</strong> {multa.ait || 'N/A'}</div>
                    <div><strong>Placa:</strong> {multa.placa || 'N/A'}</div>
                    <div><strong>Data Infração:</strong> {formatDate(multa.data_infracao)}</div>
                    <div><strong>Valor:</strong> {formatCurrency(multa.valor || 0)}</div>
                    <div><strong>Vencimento:</strong> {formatDate(multa.vencimento)}</div>
                    <div><strong>CPF:</strong> {multa.cpf || 'N/A'}</div>
                    <div><strong>CNPJ:</strong> {multa.cnpj || 'N/A'}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhuma multa encontrada no DETRAN RJ.</p>
          )}
        </div>
      )}

      {/* SNCR Imóveis */}
      {data.sncrImoveis && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 bg-green-100 p-2 rounded">SNCR - Sistema Nacional de Cadastro Rural</h3>
          {data.sncrImoveis.data && data.sncrImoveis.data.length > 0 ? (
            <div className="space-y-3">
              {data.sncrImoveis.data.map((item: any, index: number) => (
                <div key={index} className="border border-gray-300 p-3 rounded">
                  <div className="grid grid-cols-2 gap-2">
                    <div><strong>Status CSV:</strong> {item.conseguiu_emitir_csv ? 'Disponível' : 'Indisponível'}</div>
                    {item.site_receipt_csv && (
                      <div className="col-span-2">
                        <strong>Link CSV:</strong> 
                        <a href={item.site_receipt_csv} target="_blank" rel="noopener noreferrer" 
                           className="text-blue-600 underline ml-2">
                          Baixar Arquivo CSV
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhum dado de imóvel encontrado no SNCR.</p>
          )}
        </div>
      )}

      {/* Raw Data for Other Consultations */}
      {data.rawData && !data.detranMgMultas && !data.sefazSpDebitos && !data.detranRjMultas && !data.sncrImoveis && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 bg-gray-100 p-2 rounded">Dados da Consulta</h3>
          <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto max-h-96">
            {JSON.stringify(data.rawData, null, 2)}
          </pre>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 border-t pt-4 mt-8">
        <p>Este relatório foi gerado pela Mobilis Consultas</p>
        <p>Para dúvidas entre em contato conosco</p>
        <p className="mt-2">© 2024 Mobilis Consultas. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default EnhancedReportTemplate;