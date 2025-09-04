-- Add new consultation types with updated pricing
INSERT INTO consultation_types (name, description, price_cents) VALUES
('cpf_simples', 'Consulta CPF Simples', 312),
('cnpj_quadro_dividas', 'CNPJ Quadro Societário e Dívidas', 800),
('cnpj_completo', 'CNPJ Completo', 1700),
('consulta_avulsa', 'Consulta Avulsa', 8500)
ON CONFLICT (name) DO UPDATE SET
  price_cents = EXCLUDED.price_cents,
  description = EXCLUDED.description;