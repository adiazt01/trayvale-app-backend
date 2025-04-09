import { FindAllCustomersHandler } from './find-all-customers.handler';
import { FindOneCustomerHandler } from './find-one-customer.handler';

export const queriesHandlers = [
  FindOneCustomerHandler,
  FindAllCustomersHandler,
];
