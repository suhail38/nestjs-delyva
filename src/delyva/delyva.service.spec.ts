require('dotenv').config();
import { BadRequestException, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DelyvaService } from './delyva.service';
import { priceQuoteData } from './test-datas/price-quote.data';
import { createOrderData } from './test-datas/create-order.data';

const { APIKEY, COMPANYID, CUSTOMERID } = process.env;

describe('Delyva Service', () => {
  let service: DelyvaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: DelyvaService,
          useValue: new DelyvaService(new HttpService(), {
            apiKey: APIKEY,
            companyId: COMPANYID,
            customerId: CUSTOMERID,
          }),
        },
      ],
    }).compile();

    service = module.get<DelyvaService>(DelyvaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get account details', () => {
    it('should return matched customerId', async () => {
      const account = await service.getAccountDetails();
      expect(account.data.id).toEqual(parseInt(CUSTOMERID));
    });
  });

  describe('Get price', () => {
    it('should return price quotation details', async () => {
      const priceQuote = await service.priceQuote(priceQuoteData[0]);
      expect(!priceQuote.errors.length).toBeTruthy();
      expect(priceQuote.data).toHaveProperty('services');
      expect(priceQuote.data.waypoints).toHaveLength(2);
    });

    it('should return 400 Bad Request', async () => {
      try {
        await service.priceQuote(priceQuoteData[1]);
      } catch (err) {
        expect(err.response.status).toBe(400);
      }
    });

    it('should return empty array of services', async () => {
      const priceQuote = await service.priceQuote(priceQuoteData[2]);
      expect(priceQuote.data.services).toHaveLength(0);
    });
  });

  let orderId: string[] = [];
  describe('Create, confirm, get and cancel orders', () => {
    // Set timeout overriding default timeout
    jest.setTimeout(50000);

    it('should return order details', async () => {
      const order0 = await service.createOrder(createOrderData[0]);
      const order1 = await service.createOrder(createOrderData[1]);
      expect(order0.data.status).toBe('processing');
      expect(order0.data.orderId).toBeDefined();
      expect(order1.data.status).toBe('draft');
      expect(order1.data.id).toBeDefined();
      // Save orderId
      orderId.push(order0.data.orderId, order1.data.id);
    });

    it('should return 400 Bad Request', async () => {
      Promise.allSettled([
        service.createOrder(createOrderData[2]),
        service.createOrder(createOrderData[3]),
      ]).then((result) => {
        expect(result[0].status && result[1].status).toBe('rejected');
      });
    });

    it('should change DRAFT to PROCESSING', async () => {
      // confirm draft order to be processed
      await service.confirmOrder({ orderId: orderId[1], serviceCode: 'SDD' });
      const draft = await service.getOrder({ orderId: orderId[1] });

      expect(draft.data.id).toEqual(orderId[1]);
      expect(draft.data.status).toBe('processing');
    });

    it('should cancelled test orders', async () => {
      // cancel test orders
      const cancel0 = await service.cancelOrder({ orderId: orderId[0] });
      const cancel1 = await service.cancelOrder({ orderId: orderId[1] });

      expect(cancel0.data.status).toBe('cancelled');
      expect(cancel1.data.id).toEqual(orderId[1]);
    });
  });

  describe('Track, cancel CREATED order and get refund', () => {
    jest.setTimeout(50000);
    let order;

    it('should has track histories', async () => {
      // get one CREATED order
      const { data } = await service.getAllOrders();
      const createdOrder = data.filter((item) => item.status === 'created');
      if (!createdOrder.length)
        throw new BadRequestException(
          'No created order available to be tracked',
        );
      order = createdOrder[0];
      // tracking orders
      const track0 = await service.getETA({
        consignmentNo: order.consignmentNo,
      });

      expect(track0.data.consignmentNo).toBe(order.consignmentNo);
      expect(track0.data.histories[0]).toHaveProperty('id');
    });

    it('should refund wallet balance', async () => {
      // get current credit balance
      if (!order)
        throw new BadRequestException(
          'No created order available to be refunded',
        );
      const current = await service.getAccountDetails();
      const cancel = await service.cancelOrder({ orderId: order.id });

      // get credit balance (expect refunded)
      const {
        data: { walletBalance },
      } = await service.getAccountDetails();
      expect(cancel.data.status).toBe('cancelled');
      expect(parseInt(walletBalance)).toBeGreaterThan(
        parseInt(current.data.walletBalance),
      );
    });
  });

  describe('Delete test orders', () => {
    it('should delete test orders', async () => {
      const d0 = await service.deleteOrder({ orderId: orderId[0] });
      const d1 = await service.deleteOrder({ orderId: orderId[1] });
      expect(d0.data && d1.data).toBeTruthy();
    });
    // it('should delete All cancelled orders in first page', async () => {
    //   jest.setTimeout(50000);
    //   const { data } = await service.getAllOrders();
    //   const orderIds = data
    //     .filter((order) => order.status === 'cancelled')
    //     .map((order) => order.id);
    //   for (let orderId of orderIds) await service.deleteOrder({ orderId });
    //   const deleted = await service.getOrder({ orderId: orderIds[0] });
    //   expect(deleted).toMatchObject({});
    // });
  });
});
