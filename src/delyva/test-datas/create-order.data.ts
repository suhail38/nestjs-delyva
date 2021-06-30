import { CreateOrderDto } from '../dto/create-order.dto';
export const createOrderData: CreateOrderDto[] = [];

// standard input data
const data1: CreateOrderDto = {
  customerId: 95199,
  process: true,
  // poll: true,
  serviceCode: 'DX',
  paymentMethodId: 0,
  waypoint: [
    {
      type: 'PICKUP',
      scheduledAt: '2021-12-24T12:00:00+0800',
      inventory: [
        {
          name: 'Undi POS',
          type: 'PARCEL',
          price: {
            amount: 100.5,
            currency: 'MYR',
          },
          weight: {
            value: 0.2,
            unit: 'kg',
          },
          quantity: 4,
          description: 'Hidup YB!',
        },
        {
          name: 'Celcius Coffee',
          type: 'PARCEL',
          price: {
            amount: 18.0,
            currency: 'MYR',
          },
          weight: {
            value: 800,
            unit: 'g',
          },
          quantity: 10,
          description: 'Mocha Choco flavor',
        },
      ],
      contact: {
        name: 'Test Sender',
        email: 'sender@test.com',
        phone: '60110000300',
        unitNo: '3F-10',
        address1: 'Celcius Coffee',
        address2: 'IOI City Mall',
        city: 'Putrajaya',
        state: 'Putrajaya',
        postcode: '62502',
        country: 'MY',
        coord: {
          lat: '2.96936825053312',
          lon: '101.71148592733367',
        },
      },
    },
    {
      type: 'DROPOFF',
      scheduledAt: '2021-12-24T13:00:00+0800',
      inventory: [
        {
          name: 'Undi POS',
          type: 'PARCEL',
          price: {
            amount: 100.5,
            currency: 'MYR',
          },
          weight: {
            value: 0.2,
            unit: 'kg',
          },
          quantity: 4,
          description: 'Hidup YB!',
        },
        {
          name: 'Celcius Coffee',
          type: 'PARCEL',
          price: {
            amount: 18.0,
            currency: 'MYR',
          },
          weight: {
            value: 800,
            unit: 'g',
          },
          quantity: 10,
          description: 'Mocha Choco flavor',
        },
      ],
      contact: {
        name: 'Test Receiver',
        email: 'receiver@test.com',
        phone: '60014433333',
        unitNo: '',
        address1: 'JomJapan',
        address2: 'Pandan Jaya',
        city: 'Kuala Lumpur',
        state: 'Kuala Lumpur',
        postcode: '51000',
        country: 'MY',
        coord: {
          lat: '3.1310689052862486',
          lon: '101.73842900872698',
        },
      },
    },
  ],
};

// DRAFT of order
const data2 = Object.assign({}, data1);
data2.process = false;

// empty receiver inventory
const data3 = JSON.parse(JSON.stringify(data1));
data3.waypoint[1].inventory = [];

// invalid serviceCode
const data4 = Object.assign({}, data1);
data4.serviceCode = 'INVALID-CODE';

// save test datas
createOrderData.push(data1, data2, data3, data4);
