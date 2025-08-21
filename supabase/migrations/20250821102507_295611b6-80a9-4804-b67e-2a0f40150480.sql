-- Create function to deduct user credits
CREATE OR REPLACE FUNCTION public.deduct_user_credits(
  user_id UUID,
  amount_cents INTEGER,
  description TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_balance INTEGER;
BEGIN
  -- Get current balance
  SELECT balance_cents INTO current_balance 
  FROM user_credits 
  WHERE user_credits.user_id = deduct_user_credits.user_id;
  
  -- Check if user has enough credits
  IF current_balance IS NULL OR current_balance < amount_cents THEN
    RAISE EXCEPTION 'Insufficient credits. Current balance: %, Required: %', current_balance, amount_cents;
  END IF;
  
  -- Deduct credits
  UPDATE user_credits 
  SET 
    balance_cents = balance_cents - amount_cents,
    total_spent_cents = total_spent_cents + amount_cents,
    updated_at = now()
  WHERE user_credits.user_id = deduct_user_credits.user_id;
  
  -- Log transaction
  INSERT INTO credit_transactions (
    user_id,
    type,
    amount_cents,
    description
  ) VALUES (
    deduct_user_credits.user_id,
    'DEBIT',
    -amount_cents,
    description
  );
  
  RETURN TRUE;
END;
$$;