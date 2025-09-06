-- Create table for storing InfoSimples API configurations
CREATE TABLE IF NOT EXISTS api_configurations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  api_name TEXT NOT NULL UNIQUE,
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

-- Update consultation types with new prices
UPDATE consultation_types SET price_cents = 8500 WHERE name = 'imoveis';

-- Insert new consultation types
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

-- Enable RLS for api_configurations
ALTER TABLE api_configurations ENABLE ROW LEVEL SECURITY;

-- Create policy for api_configurations (admin access only)
CREATE POLICY "api_configurations_admin_access" ON api_configurations
FOR ALL USING (false);