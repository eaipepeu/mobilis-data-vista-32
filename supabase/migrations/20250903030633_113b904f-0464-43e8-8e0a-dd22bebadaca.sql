-- Update subscription plans with new structure
UPDATE subscription_plans_v2 SET
  name = 'Básico',
  price_cents = 5000,
  description = 'Ideal para quem precisa de consultas rápidas e pontuais, sem compromisso',
  features = '["R$ 60,00 em créditos de consulta", "Consultas de CPF e Veículos", "Suporte via e-mail", "Validade: 3 meses"]'::jsonb,
  consultation_limits = '{"cpf": 999999, "veiculo": 999999, "cnpj": 0, "total_credits": 6000}'::jsonb
WHERE id IN (SELECT id FROM subscription_plans_v2 WHERE name LIKE '%Básico%' LIMIT 1);

UPDATE subscription_plans_v2 SET
  name = 'Empresarial',
  price_cents = 10000,
  description = 'Perfeito para quem precisa de mais controle e dados. Tenha acesso a relatórios de suas consultas.',
  features = '["R$ 120,00 em créditos de consulta", "Consultas de CPF e Veículos", "Suporte via e-mail", "Relatório PDF", "Validade: 6 meses"]'::jsonb,
  consultation_limits = '{"cpf": 999999, "veiculo": 999999, "cnpj": 0, "total_credits": 12000}'::jsonb
WHERE id IN (SELECT id FROM subscription_plans_v2 WHERE name LIKE '%Empresarial%' LIMIT 1);

-- Insert new plans
INSERT INTO subscription_plans_v2 (name, price_cents, description, features, consultation_limits, billing_period)
VALUES 
('Intermediário', 35000, 'A solução completa para profissionais. Otimize seu trabalho com relatórios detalhados e suporte diferenciado.', 
 '["700 consultas", "Todas as consultas CPF, CNPJ e Veículos", "Suporte via e-mail e whatsapp", "02 relatórios", "Histórico de Consultas", "Plano mensal com fidelidade de 12 meses"]'::jsonb,
 '{"cpf": 700, "veiculo": 700, "cnpj": 700, "total_consultations": 700}'::jsonb, 'monthly'),

('Essencial', 89900, 'Ideal para profissionais que precisam de relatórios completos e histórico de consultas',
 '["2000 consultas", "Todas as consultas CPF, CNPJ e Veículos", "Suporte exclusivo", "Relatórios completos", "Histórico de Consultas", "Plano mensal com fidelidade de 12 meses"]'::jsonb,
 '{"cpf": 2000, "veiculo": 2000, "cnpj": 2000, "total_consultations": 2000}'::jsonb, 'monthly'),

('Pro', 179900, 'Feito para grandes volumes. Inclui todos os recursos essenciais, com alertas e alta capacidade de consultas',
 '["4000 consultas", "Todas as consultas disponíveis", "Suporte exclusivo", "Relatórios completos", "Histórico de Consultas", "Alertas Personalizados", "Plano mensal com fidelidade de 12 meses"]'::jsonb,
 '{"cpf": 4000, "veiculo": 4000, "cnpj": 4000, "total_consultations": 4000}'::jsonb, 'monthly');

-- Create email verification table for payment tokens
CREATE TABLE IF NOT EXISTS payment_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  token TEXT NOT NULL,
  email TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  plan_id UUID,
  expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '30 minutes',
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE payment_tokens ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own payment tokens" ON payment_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payment tokens" ON payment_tokens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payment tokens" ON payment_tokens
  FOR UPDATE USING (auth.uid() = user_id);