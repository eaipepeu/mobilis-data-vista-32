-- Add new consultation types with updated pricing
INSERT INTO consultation_types (name, description, price_cents, api_endpoint, api_method) VALUES
('cpf_simples', 'Consulta CPF Simples', 312, '/cpf/simples', 'POST'),
('cnpj_quadro_dividas', 'CNPJ Quadro Societário e Dívidas', 800, '/cnpj/quadro-dividas', 'POST'),
('cnpj_completo', 'CNPJ Completo', 1700, '/cnpj/completo', 'POST'),
('consulta_avulsa', 'Consulta Avulsa', 8500, '/consulta/avulsa', 'POST')
ON CONFLICT (name) DO UPDATE SET
  price_cents = EXCLUDED.price_cents,
  description = EXCLUDED.description,
  api_endpoint = EXCLUDED.api_endpoint,
  api_method = EXCLUDED.api_method;