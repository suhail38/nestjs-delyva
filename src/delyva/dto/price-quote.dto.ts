import { Address } from '../types/address.type';

export class PriceQuoteDto {
  // Required data
  origin: Address;
  destination: Address;
  // Optional data
  weight?: Weight;
  scheduledAt?: string;
  companyId?: string;
  customerId?: string;
  orderId?: string;
  distance?: Distance;
  itemType?: string;
  itemTypeId?: number;
  serviceCode?: string;
  serviceCompanyCode?: string;
  promoCode?: string;
  serviceAddon?: ServiceAddon[];
}

export interface Weight {
  unit: string;
  value: number;
}

interface Distance {
  unit: string;
  value: number;
}

// export interface QuoteAddress
//   extends Omit<Address, 'unitNo' | 'address1' | 'address2' | 'city'> {}

export interface ServiceAddon {
  id: number;
  value?: string;
  qty?: number;
}
