import { Contact } from '../types/contact.type';
import { Inventory } from '../types/inventory.type';
import { ServiceAddon } from './price-quote.dto';

interface Waypoint {
  type: string; // dropoff or pickup
  inventory: Inventory[];
  contact: Contact;
  scheduledAt?: string;
}

export class CreateOrderDto {
  customerId: number;
  serviceCode: string;
  waypoint: Waypoint[];
  // optional data
  paymentMethodId?: number;
  process?: boolean;
  poll?: boolean;
  consignmentNo?: string;
  note?: string;
  promoCode?: string;
  serviceAddon?: ServiceAddon[];
}
