-- Create new consultation types with updated pricing
INSERT INTO consultation_types (name, description, price_cents, is_active) VALUES
('cpf_simples', 'Consulta CPF Simples - dados cadastrais e dívidas (sem credor)', 312, true),
('cpf_completo', 'Consulta CPF Completa - dados cadastrais, dívidas e credores', 750, true),
('cnpj_simples', 'Consulta CNPJ Simples - quadro societário e dívidas (sem credor)', 800, true),
('cnpj_completo', 'Consulta CNPJ Completa - todos os dados incluindo credores', 1700, true),
('veiculo_basico', 'Consulta Veículo Básica - multas e CRLV', 1700, true),
('veiculo_master', 'Consulta Veículo Master - multas, CRLV, sinistros e débito IPVA', 3500, true),
('protesto_nacional', 'Consulta Protesto Nacional - protestos em cartórios do Brasil', 1000, true)
ON CONFLICT (name) DO UPDATE SET
  price_cents = EXCLUDED.price_cents,
  description = EXCLUDED.description;

-- Update existing consultation types with new prices
UPDATE consultation_types SET 
  price_cents = 8500,
  description = 'Consulta completa de imóveis vinculados ao CPF ou CNPJ'
WHERE name = 'imoveis';

-- Update credit packages with new pricing
UPDATE credit_packages SET
  price_cents = 5000,
  credit_amount_cents = 6000,
  name = 'Pacote Básico',
  description = 'Ideal para quem precisa de consultas rápidas e pontuais, sem compromisso'
WHERE name = 'Pacote Básico';

UPDATE credit_packages SET
  price_cents = 10000,
  credit_amount_cents = 12000,
  name = 'Pacote Empresarial',
  description = 'Perfeito para quem precisa de mais controle e dados. Tenha acesso a relatórios de suas consultas.'
WHERE name = 'Pacote Empresarial';

-- Update subscription plans with new structure
UPDATE subscription_plans_v2 SET
  name = 'Plano Intermediário',
  description = 'A solução completa para profissionais. Otimize seu trabalho com relatórios detalhados e suporte diferenciado.',
  price_cents = 35000,
  consultation_limits = '{"total_consultas": 700, "cpf": 200, "cnpj": 100, "veiculo": 400}',
  features = '["700 consultas", "Todas as consultas CPF, CNPJ e Veículos", "Suporte via e-mail e whatsapp", "02 relatórios", "Histórico de Consultas", "Plano mensal com fidelidade de 12 meses"]'
WHERE name = 'Plano Intermediário';

-- Insert new subscription plans if they don't exist
INSERT INTO subscription_plans_v2 (name, description, price_cents, consultation_limits, features, billing_period, is_active) VALUES
('Plano Essencial', 'Ideal para profissionais que precisam de relatórios completos e histórico de consultas', 89900, '{"total_consultas": 2000, "cpf": 600, "cnpj": 400, "veiculo": 1000}', '["2000 consultas", "Todas as consultas CPF, CNPJ e Veículos", "Suporte exclusivo", "Relatórios completos", "Histórico de Consultas", "Plano mensal com fidelidade de 12 meses"]', 'monthly', true),
('Plano Pro', 'Feito para grandes volumes. Inclui todos os recursos essenciais, com alertas e alta capacidade de consultas', 179900, '{"total_consultas": 4000, "cpf": 1200, "cnpj": 800, "veiculo": 2000, "alertas": true}', '["4000 consultas", "Todas as consultas disponíveis", "Suporte exclusivo", "Relatórios completos", "Histórico de Consultas", "Alertas Personalizados", "Plano mensal com fidelidade de 12 meses"]', 'monthly', true)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  price_cents = EXCLUDED.price_cents,
  consultation_limits = EXCLUDED.consultation_limits,
  features = EXCLUDED.features;

-- Create table for storing InfoSimples API configurations
CREATE TABLE IF NOT EXISTS api_configurations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  api_name TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  token_secret_name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert InfoSimples API configurations
INSERT INTO api_configurations (api_name, endpoint, token_secret_name, is_active) VALUES
('infosimples_cpf', 'https://api.infosimples.com/api/v2/consulta/cpf', 'INFOSIMPLES_TOKEN', true),
('infosimples_cnpj', 'https://api.infosimples.com/api/v2/consulta/cnpj', 'INFOSIMPLES_TOKEN', true),
('infosimples_veiculo_sp', 'https://api.infosimples.com/api/v2/detran/sp/veiculo', 'INFOSIMPLES_TOKEN', true),
('infosimples_veiculo_rj', 'https://api.infosimples.com/api/v2/detran/rj/veiculo', 'INFOSIMPLES_TOKEN', true),
('infosimples_veiculo_mg', 'https://api.infosimples.com/api/v2/detran/mg/veiculo', 'INFOSIMPLES_TOKEN', true),
('infosimples_veiculo_pr', 'https://api.infosimples.com/api/v2/detran/pr/veiculo', 'INFOSIMPLES_TOKEN', true),
('infosimples_imoveis', 'https://api.infosimples.com/api/v2/consulta/imoveis', 'INFOSIMPLES_TOKEN', true),
('infosimples_protesto', 'https://api.infosimples.com/api/v2/consulta/protesto', 'INFOSIMPLES_TOKEN', true),
('infosimples_bens', 'https://api.infosimples.com/api/v2/consulta/bens/imoveis', 'INFOSIMPLES_TOKEN', true)
ON CONFLICT (api_name) DO UPDATE SET
  endpoint = EXCLUDED.endpoint,
  is_active = EXCLUDED.is_active;

-- Enable RLS for api_configurations
ALTER TABLE api_configurations ENABLE ROW LEVEL SECURITY;

-- Create policy for api_configurations (admin access only)
CREATE POLICY "api_configurations_admin_access" ON api_configurations
FOR ALL USING (false); -- Only accessible via service role

-- Create trigger for updating timestamps
CREATE TRIGGER update_api_configurations_updated_at
    BEFORE UPDATE ON api_configurations
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();