-- Fix search_path for generate_wallet_address function
CREATE OR REPLACE FUNCTION public.generate_wallet_address(crypto TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  chars TEXT;
  result TEXT := '';
  i INTEGER;
  prefix TEXT;
  length INTEGER;
BEGIN
  CASE crypto
    WHEN 'BTC' THEN
      chars := '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
      prefix := '1';
      length := 33;
    WHEN 'ETH', 'USDT' THEN
      chars := '0123456789abcdef';
      prefix := '0x';
      length := 40;
    ELSE
      chars := '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
      prefix := '';
      length := 34;
  END CASE;

  result := prefix;
  
  FOR i IN 1..length LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  
  RETURN result;
END;
$$;

-- Fix search_path for update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;