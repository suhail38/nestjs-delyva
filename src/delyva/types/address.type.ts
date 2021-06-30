export interface Address {
  unitNo?: string;
  address1?: string;
  address2?: string;
  city?: string;
  postcode?: string;
  state?: string;
  country?: string;
  coord?: {
    lat: string;
    lon: string;
  };
}
