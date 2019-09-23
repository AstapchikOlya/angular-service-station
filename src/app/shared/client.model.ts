import { Car } from './car.model';

export class Client {

  constructor(
      public firstName: string,
      public lastName: string,
      public birthDate: string,
      public address: string,
      public phone: string,
      public email: string,
      public cars: Car[]
  ) {}

}