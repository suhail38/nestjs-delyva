export class ConfirmOrderDto {
  orderId: string;
  serviceCode: string;
  originScheduledAt?: string;
  destinationScheduledAt?: string;
}
