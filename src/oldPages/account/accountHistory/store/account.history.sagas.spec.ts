import { AccountHistoryResource } from './account.history.types';
import * as matchers from 'redux-saga-test-plan/matchers';
import * as actions from './account.history.actions';
import { expectSaga } from 'redux-saga-test-plan';
import * as sagas from './account.history.sagas';
import Request, { RequestMethod, QueryParam } from '../../../../api/request';
import { APIError } from '../../../../types/ReduxState';
import * as selectors from './account.history.selectors';
import { pageIncrements } from './account.history.reducer';
import { logOut } from '../../../../pages/auth/login/store/login.actions';

describe('Account History - Sagas', () => {
  describe('Get account history', () => {
    const queryParams: QueryParam[] = [{ name: 'limit', value: pageIncrements.toString() }];
    it('Should handle successfully fetching account history data', () => {
      const accountHistoryResource: AccountHistoryResource = {
        charges: [
          {
            id: 'ch_2398y592bfnip23f',
            status: 'succeeded',
            amount: 160.05,
            sourceId: 'card_some7362regex',
            chargedAt: 1572274970,
            description: 'some charge boi here',
            reasonForFailure: null,
            amountRefunded: 0
          }
        ],
        hasMore: false
      };

      return expectSaga(sagas.getAccountHistoryRequest)
        .provide([
          [matchers.select(selectors.getPerPage), pageIncrements],
          [matchers.select(selectors.getLastChargeId), undefined],
          [
            matchers.call([Request, 'send'], RequestMethod.GET, '/account/payment-history', queryParams),
            accountHistoryResource
          ]
        ])
        .put(actions.getAccountHistorySuccess(accountHistoryResource))
        .run();
    });

    it('Should handle unsuccessfully fetching account history data', () => {
      const apiError: APIError = {
        error: 'error',
        message: 'not good',
        status: 400
      };

      return expectSaga(sagas.getAccountHistoryRequest)
        .provide([
          [matchers.select(selectors.getPerPage), pageIncrements],
          [matchers.select(selectors.getLastChargeId), undefined],
          [
            matchers.call([Request, 'send'], RequestMethod.GET, '/account/payment-history', queryParams),
            Promise.reject(apiError)
          ]
        ])
        .put(actions.getAccountHistoryFailure(apiError))
        .run();
    });

    it('Should handle unsuccessfully fetching account history data due to being unauthenticated', () => {
      const apiError: APIError = {
        error: 'Unauthenticated',
        message: 'not good',
        status: 401
      };

      return expectSaga(sagas.getAccountHistoryRequest)
        .provide([
          [matchers.select(selectors.getPerPage), pageIncrements],
          [matchers.select(selectors.getLastChargeId), undefined],
          [
            matchers.call([Request, 'send'], RequestMethod.GET, '/account/payment-history', queryParams),
            Promise.reject(apiError)
          ]
        ])
        .put(actions.getAccountHistoryFailure(apiError))
        .put(logOut())
        .run();
    });
  });
});
