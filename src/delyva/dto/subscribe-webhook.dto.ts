export enum WebhookEvent {
  ORDER_CREATED = 'order.created',
  ORDER_FAILED = 'order.failed',
  ORDER_UPDATED = 'order.updated',
  ORDER_TRACKING_UPDATE = 'order_tracking.update',
}

export class SubscribeWebhookDto {
  event: WebhookEvent;
  url: string;
}

export class UpdateWebhookDto {
  webhookId: number;
  event: WebhookEvent;
  url: string;
}
