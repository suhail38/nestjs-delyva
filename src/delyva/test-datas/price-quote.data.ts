import { PriceQuoteDto } from '../dto/price-quote.dto';
export var priceQuoteData: PriceQuoteDto[] = [];

// standard input data
const data1: PriceQuoteDto = {
  origin: {
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
  destination: {
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
  weight: {
    unit: 'kg',
    value: 1,
  },
};

// invalid weight unit
const data2 = Object.assign({}, data1);
data2.weight = { unit: 'tons', value: 1 };

// no service available
const data3 = Object.assign({}, data1);
data3.itemType = 'CATS';

// save test datas
priceQuoteData.push(data1, data2, data3);
