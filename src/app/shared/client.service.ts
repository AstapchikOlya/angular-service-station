import { Client } from './client.model';
import { Car } from './car.model';
import { Order } from './order.model';

export class ClientService {

  private clients: Client[] = [
    new Client(
      'Gwen',
      'Morville',
      '12/16/1994',
      '58 South Place',
      '+375 (29) 666 00 77',
      'gmorville0@webmd.com',
      [
        new Car(
          'Jaguar',
          'XK Series',
          1998,
          '3N1BC1CP4CK362380',
          [
            new Order(
              '10/27/2018',
              271,
              'In Progress'
            ),
            new Order(
              '02/22/2019',
              6231,
              'Completed'
            ),
            new Order(
              '08/23/2019',
              4693,
              'In Progress'
            )
          ]
        ),
        new Car(
          'Mazda',
          'Miata MX-5',
          1993,
          '1G4GH5E3XCF049033',
          [
            new Order(
              '12/15/2018',
              3443,
              'Completed'
            )
          ]
        ),
      ]
    ),
    new Client(
      'Evvie',
      'Paunsford',
      '06/04/1995',
      '7 High Crossing Pass',
      '+375 (17) 254 98 00',
      'epaunsford1@slashdot.org',
      [
        new Car(
          'Mazda',
          '626',
          1995,
          'WAUVC68E75A715971',
          [
            new Order(
              '10/02/2019',
              6533,
              'Cancelled'
            )
          ]
        ),
      ]
    ),
    new Client(
      'Natale',
      'Harling',
      '06/23/1958',
      '130 Northview Way',
      '+375 (25) 987 65 43',
      'nharling2@twitter.com',
      [
        new Car(
          'BMW',
          'Z4 M',
          2008,
          '2C3CCABG9CH326422',
          []
        ),
        new Car(
          'Mitsubishi',
          'Pajero',
          1993,
          'WAUTFAFH0BN536075',
          [
            new Order(
              '03/10/2019',
              8262,
              'Cancelled'
            ),
            new Order(
              '09/21/2018',
              578,
              'Cancelled'
            ),
            new Order(
              '05/13/2019',
              7480,
              'Completed'
            )
          ]
        )
      ]
    ),
    new Client(
      'Susanne',
      'Tubby',
      '11/11/1963',
      '8 Scott Pass',
      '+375 (29) 123 45 67',
      'stubby3@ed.gov',
      []
    )
  ];

  constructor() {}

  getClients() {
    return this.clients;
  }

  getClient(clientIndex) {
    return this.getClients()[clientIndex];
  }

  addClient(newClient: Client) {
    this.clients.push(newClient);
  }

  updateClient(clientIndex: number, updatedClient: Client) {
    this.clients[clientIndex] = updatedClient;
  }

  searchClients(fullName) {
    return this.getClients().filter(client => client.firstName + ' ' + client.lastName === fullName);
  }

  getClientCars(clientIndex: number) {
    return this.clients[clientIndex].cars;
  }

  getCar(clientIndex: number, carIndex: number) {
    return this.getClientCars(clientIndex)[carIndex];
  }

  hasCarAnyOrders(clientId: number, carId: number) {
    return this.getCarOrders(clientId, carId).length != 0;
  }

  addCar(clientIndex: number, newCar: Car) {
    this.getClientCars(clientIndex).push(newCar);
  }

  updateCar(clientIndex: number, carIndex: number, updatedCar: Car) {
    this.getClientCars(clientIndex)[carIndex] = updatedCar;
  }

  removeClientCar(clientIndex: number, carIndex: number) {
    this.clients[clientIndex].cars.splice(carIndex, 1);
  }

  getCarOrders(clientIndex: number, carIndex: number) {
    return this.getClientCars(clientIndex)[carIndex].orders;
  }

  getOrder(clientIndex: number, carIndex: number, orderIndex: number) {
    return this.getCarOrders(clientIndex, carIndex)[orderIndex];
  }

  addOrder(clientIndex: number, carIndex: number, newOrder: Order) {
    this.getCarOrders(clientIndex, carIndex).push(newOrder);
  }

  updateOrder(clientIndex: number, carIndex: number, orderIndex: number, updatedOrder: Order) {
    this.getCarOrders(clientIndex, carIndex)[orderIndex] = updatedOrder;
  }

  removeCarOrder(clientIndex: number, carIndex: number, orderIndex: number) {
    this.clients[clientIndex].cars[carIndex].orders.splice(orderIndex, 1);
  }

}