-- Add new consultation types for vehicle and property consultations
INSERT INTO consultation_types (name, description, price_cents, is_active) VALUES
('detran_mg_multas', 'Detran MG - Consulta de Multas e Extrato', 2000, true),
('sefaz_sp_debitos', 'Sefaz SP - Débitos de Veículo', 2400, true),
('detran_rj_multas', 'Detran RJ - Multas e Guias', 2000, true),
('sncr_imoveis', 'SNCR - Consulta de Imóveis', 2600, true),
('detran_consulta_completa', 'Detran - Consulta Completa de Veículo', 3500, true)
ON CONFLICT (name) DO UPDATE SET
description = EXCLUDED.description,
price_cents = EXCLUDED.price_cents,
is_active = EXCLUDED.is_active;