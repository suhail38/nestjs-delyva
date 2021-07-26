import { LoggerService } from '@nestjs/common';

export const CONFIG_OPTIONS = 'DELYVA_CONFIG_OPTIONS';

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export interface DelyvaOptions {
  apiKey: string;
  companyId: string;
  customerId: string;
  logger?: LoggerService;
}
