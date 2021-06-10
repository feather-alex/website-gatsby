import CreditCard from './CreditCard';

export const enum State {
  NewYork = 'New York',
  NewJersey = 'New Jersey',
  California = 'California'
}

export default interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  company: string | null;
  address: string;
  apt: string | null;
  city: string;
  state: State;
  zipcode: number;
  creditCard: CreditCard;
}
