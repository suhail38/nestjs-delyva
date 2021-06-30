import { Address } from './address.type';

export interface Contact extends Address {
  name: string;
  phone: string;
  // Optional data
  email?: string;
}
