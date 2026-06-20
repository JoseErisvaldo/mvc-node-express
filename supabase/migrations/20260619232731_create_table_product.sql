CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  cost_price DECIMAL(10,2) CHECK (cost_price > 0),
  sku VARCHAR(100) NOT NULL,
  barcode VARCHAR(100) NOT NULL,
  stock_quantity INTEGER DEFAULT 0 NOT NULL CHECK (stock_quantity >= 0),
  min_stock_level INTEGER DEFAULT 0 CHECK (min_stock_level >= 0),
  max_stock_level INTEGER DEFAULT 0 CHECK (max_stock_level >= 0),
  unit VARCHAR(50) DEFAULT 'un',
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  establishment_id UUID NOT NULL REFERENCES establishments(id) ON DELETE RESTRICT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'out_of_stock', 'discontinued')),
  image_url TEXT,
  weight DECIMAL(8,3),
  dimensions JSONB,
  tags TEXT[],
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  CONSTRAINT unique_sku_per_establishment UNIQUE (sku, establishment_id),
  CONSTRAINT unique_barcode_per_establishment UNIQUE (barcode, establishment_id)
);

CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_establishment_id ON products(establishment_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku, establishment_id);
CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode, establishment_id);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock_quantity);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para atualizar status baseado no estoque
CREATE OR REPLACE FUNCTION update_product_stock_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Se o estoque chegou a zero, marcar como fora de estoque
    IF NEW.stock_quantity = 0 AND OLD.stock_quantity > 0 THEN
        NEW.status = 'out_of_stock';
    -- Se o estoque voltou a ter produtos e estava fora de estoque, marcar como ativo
    ELSIF NEW.stock_quantity > 0 AND OLD.status = 'out_of_stock' THEN
        NEW.status = 'active';
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_product_stock_status_trigger 
    BEFORE UPDATE OF stock_quantity ON products
    FOR EACH ROW EXECUTE FUNCTION update_product_stock_status();