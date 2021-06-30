import { Weight } from '../dto/price-quote.dto';

interface Price {
  amount: number;
  currency: string;
}

export interface Inventory {
  name: string;
  type: string;
  price?: Price;
  weight: Weight;
  quantity?: number;
  description?: string;
}
