import { HttpService, Inject, Injectable, LoggerService } from '@nestjs/common';
import { CONFIG_OPTIONS, DelyvaOptions, HttpMethod } from './delyva.definition';
import { OrderIdDto } from './dto/orderId.dto';
import { ConfirmOrderDto } from './dto/confirm-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConsignmentNoDto } from './dto/consignment-no.dto';
import { PriceQuoteDto } from './dto/price-quote.dto';
import { InvoiceIdDto } from './dto/invoiceId.dto';

@Injectable()
export class DelyvaService {
  // Api endpoint
  private readonly baseUrl = 'https://api.delyva.app/v1.0/';
  private demo: boolean;
  private apiKey: string;
  private companyId: string;
  private customerId: string;
  private logService?: LoggerService;

  constructor(
    private readonly httpService: HttpService,
    @Inject(CONFIG_OPTIONS) options: DelyvaOptions,
  ) {
    this.demo = options.demo || false;
    this.apiKey = options.apiKey;
    this.companyId = options.companyId;
    this.customerId = options.customerId;
    this.logService = options.logger;
  }

  private getUrl(endpoint: string) {
    return `${this.baseUrl}${endpoint}`;
  }

  private getApiCaller(httpMethod: HttpMethod, endpoint: string) {
    const headers = { 'X-Delyvax-Access-Token': this.apiKey };
    const url = this.getUrl(endpoint);

    const handleResponse = (response) => {
      return response.data;
    };

    const handlerError = (error) => {
      throw error;
    };

    if (httpMethod === HttpMethod.GET) {
      return (options = {}) => {
        return this.httpService
          .get(url, { ...options, headers })
          .toPromise()
          .then(handleResponse)
          .catch(handlerError);
      };
    }

    if (httpMethod === HttpMethod.DELETE) {
      return (data = {}, options = {}) => {
        return this.httpService
          .delete(url, { ...options, headers })
          .toPromise()
          .then(handleResponse)
          .catch(handlerError);
      };
    }

    if (httpMethod === HttpMethod.POST) {
      return (data = {}, options = {}) => {
        return this.httpService
          .post(url, { ...data }, { ...options, headers })
          .toPromise()
          .then(handleResponse)
          .catch(handlerError);
      };
    }

    if (httpMethod === HttpMethod.PUT) {
      return (data = {}, options = {}) => {
        return this.httpService
          .put(url, { ...data }, { ...options, headers })
          .toPromise()
          .then(handleResponse)
          .catch(handlerError);
      };
    }

    if (httpMethod === HttpMethod.PATCH) {
      return (data = {}, options = {}) => {
        return this.httpService
          .patch(url, { ...data }, { ...options, headers })
          .toPromise()
          .then(handleResponse)
          .catch(handlerError);
      };
    }
  }

  async priceQuote(data: PriceQuoteDto) {
    const api = this.getApiCaller(HttpMethod.POST, 'service/instantQuote');
    return await api(data);
  }

  async createOrder(data: CreateOrderDto) {
    const api = this.getApiCaller(HttpMethod.POST, 'order');
    return await api(data);
  }

  async confirmOrder(data: ConfirmOrderDto) {
    const api = this.getApiCaller(
      HttpMethod.POST,
      `order/${data.orderId}/process`,
    );
    return await api(data);
  }

  async cancelOrder(data: OrderIdDto) {
    const api = this.getApiCaller(
      HttpMethod.POST,
      `order/${data.orderId}/cancel`,
    );
    return await api(data);
  }

  async getOrder(data: OrderIdDto) {
    const api = this.getApiCaller(HttpMethod.GET, `order/${data.orderId}`);
    return await api();
  }

  async getAllOrders() {
    const api = this.getApiCaller(HttpMethod.GET, 'order');
    return await api();
  }

  // for testing module only
  async deleteOrder(data: OrderIdDto) {
    const api = this.getApiCaller(HttpMethod.DELETE, `order/${data.orderId}`);
    return await api();
  }

  async getETA(data: ConsignmentNoDto) {
    const dataObj = {
      companyId: this.companyId,
      consignmentNo: data.consignmentNo,
      resultType: 'latestFirst',
    };
    const api = this.getApiCaller(HttpMethod.POST, `order/track`);
    return await api(dataObj);
  }

  async getOrderHistory(data: ConsignmentNoDto) {
    const api = this.getApiCaller(
      HttpMethod.GET,
      `order/track/${data.consignmentNo}?companyId=${this.companyId}`,
    );
    return await api();
  }

  async printLabel(data: OrderIdDto) {
    const api = this.getApiCaller(
      HttpMethod.GET,
      `order/${data.orderId}/label?companyId=${this.companyId}`,
    );
    return await api();
  }

  async printInvoice(data: InvoiceIdDto) {
    const api = this.getApiCaller(
      HttpMethod.GET,
      `wallet/invoice/${data.invoiceId}`,
    );
    return await api();
  }

  async subscribeWebhook() {
    const dataObj = {
      event: 'order_tracking.update',
      url: 'https://staging-api.delyva.app/webhook/test',
    };
    const api = this.getApiCaller(HttpMethod.POST, 'webhook');
    return await api(dataObj);
  }

  async getWebhook() {
    const api = this.getApiCaller(HttpMethod.GET, 'webhook');
    return await api();
  }

  async getSpecificSubcription() {
    const api = this.getApiCaller(HttpMethod.GET, 'webhook/1?retrieve=queue');
    return await api();
  }

  async getListOfPaymentMethod() {
    const api = this.getApiCaller(HttpMethod.GET, 'order/paymentMethod');
    return await api();
  }

  async getAccountDetails() {
    const api = this.getApiCaller(HttpMethod.GET, 'customer');
    return await api();
  }
}
