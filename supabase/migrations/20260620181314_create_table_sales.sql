-- Criar tabela de vendas
CREATE TABLE IF NOT EXISTS sales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sale_number VARCHAR(50) UNIQUE NOT NULL,
  establishment_id UUID NOT NULL REFERENCES establishments(id) ON DELETE CASCADE,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,
  payment_method VARCHAR(50) DEFAULT 'cash' CHECK (payment_method IN ('cash', 'card', 'pix')),
  payment_status VARCHAR(20) DEFAULT 'paid' CHECK (payment_status IN ('pending', 'paid', 'cancelled')),
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('draft', 'completed', 'cancelled')),
  notes TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sales_user_id ON sales(user_id);
CREATE INDEX IF NOT EXISTS idx_sales_establishment_id ON sales(establishment_id);
CREATE INDEX IF NOT EXISTS idx_sales_status ON sales(status);
CREATE INDEX IF NOT EXISTS idx_sales_created_at ON sales(created_at);

ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_sales_updated_at BEFORE UPDATE ON sales
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para gerar número da venda
CREATE OR REPLACE FUNCTION generate_sale_number()
RETURNS TEXT AS $$
DECLARE
  next_number INTEGER;
  sale_number TEXT;
BEGIN
  SELECT COALESCE(MAX(CAST(SUBSTRING(sales.sale_number FROM '[0-9]+$') AS INTEGER)), 0) + 1
  INTO next_number
  FROM sales
  WHERE sales.sale_number ~ '^VD[0-9]+$';
  
  sale_number := 'VD' || LPAD(next_number::TEXT, 6, '0');
  
  RETURN sale_number;
END;
$$ LANGUAGE plpgsql;

/*
-- Trigger function para status da venda
CREATE OR REPLACE FUNCTION trg_sale_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND NEW.status = 'completed' AND (OLD.status IS DISTINCT FROM 'completed'))
      OR (TG_OP = 'INSERT' AND NEW.status = 'completed') THEN
    PERFORM process_sale_items_for_sale(NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
CREATE TRIGGER process_sale_trigger
  AFTER INSERT OR UPDATE OF status ON sales
  FOR EACH ROW
  EXECUTE FUNCTION trg_sale_status_change();*/