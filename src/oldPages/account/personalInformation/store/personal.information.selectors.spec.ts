import { State as GlobalState } from '../../../../types/ReduxState';
import { PersonalInformation } from './personal.information.types';
import * as selectors from './personal.information.selectors';

describe('Personal info - Selectors', () => {
  let state: PersonalInformation;

  const personalInfo: PersonalInformation = {
    addressInfo: [
      {
        address1: '456 Grand St',
        address2: 'Apt 5A',
        city: 'New York',
        region: 'NY',
        postal: '11241'
      }
    ],
    isFetching: false,
    accountLastAccessedAt: null,
    firstName: 'Brock',
    lastName: 'Sprokley',
    error: null,
    phone: '8902345588',
    email: 'eng@livefeather.com'
  };

  beforeEach(() => {
    state = { ...personalInfo };
  });

  it(`should return the account's email`, () => {
    const email = selectors.getEmail({ accounts: { personalInformation: state } } as GlobalState);
    expect(email).toEqual('eng@livefeather.com');
  });

  it('should return the phone number', () => {
    const phone = selectors.getPhone({ accounts: { personalInformation: state } } as GlobalState);
    expect(phone).toEqual('8902345588');
  });

  it('should return if we are currently fetching from the API', () => {
    const isFetching = selectors.isFetching({ accounts: { personalInformation: state } } as GlobalState);
    expect(isFetching).toEqual(false);
  });

  it('should return the address', () => {
    const address = selectors.getAddress({ accounts: { personalInformation: state } } as GlobalState);
    expect(address).toEqual(personalInfo.addressInfo);
  });

  it('should return the customer first name', () => {
    const firstName = selectors.getFirstName({ accounts: { personalInformation: state } } as GlobalState);
    expect(firstName).toEqual('Brock');
  });

  it('should return the customer last name', () => {
    const lastName = selectors.getLastName({ accounts: { personalInformation: state } } as GlobalState);
    expect(lastName).toEqual('Sprokley');
  });

  it('should return isUserFirstLogIn as true when accountLastAccessed at is null', () => {
    const isUserFirstLogIn = selectors.isUserFirstLogIn({ accounts: { personalInformation: state } } as GlobalState);
    expect(isUserFirstLogIn).toEqual(true);
  });

  it('should return isUserFirstLogIn as false when accountLastAccessed at is not null', () => {
    state = {
      ...state,
      accountLastAccessedAt: '2019-08-20 15:13:05.000000'
    };
    const isUserFirstLogIn = selectors.isUserFirstLogIn({ accounts: { personalInformation: state } } as GlobalState);
    expect(isUserFirstLogIn).toEqual(false);
  });

  it('should return the current error', () => {
    const error = selectors.getError({ accounts: { personalInformation: state } } as GlobalState);
    expect(error).toBeNull();
  });
});
