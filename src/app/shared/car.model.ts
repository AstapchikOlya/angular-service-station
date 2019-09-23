import { Order } from './order.model';

export class Car {

  constructor(
      public make: string,
      public model: string,
      public year: number,
      public vin: string,
      public orders: Order[]
  ) {}

}