import * as sagas from './account.overview.sagas';
import { expectSaga } from 'redux-saga-test-plan';
import { getAccountOverview as getAccountOverviewAction } from './account.overview.actions';
import * as matchers from 'redux-saga-test-plan/matchers';
import Request, { RequestMethod } from '../../../../api/request';
import { logOut } from '../../../auth/login/store/login.actions';
import * as selectors from './account.overview.selectors';
import { history } from '../../../../store/history';
import { noop } from '../../../../utils/ui-helpers';
import { mockAccountResource, mockError, mockUnauthenticatedError } from './account.overview.fixtures';

describe('Account Overview - Sagas', () => {
  it('should handle successfully getting account overview information', () => {
    return expectSaga(sagas.getAccountOverview)
      .provide([[matchers.call([Request, 'send'], RequestMethod.GET, '/account/overview'), mockAccountResource]])
      .put(getAccountOverviewAction.success(mockAccountResource))
      .run();
  });

  it('should handle unsuccessfully getting account overview information', () => {
    return expectSaga(sagas.getAccountOverview)
      .provide([[matchers.call([Request, 'send'], RequestMethod.GET, '/account/overview'), Promise.reject(mockError)]])
      .put(getAccountOverviewAction.failure(mockError))
      .run();
  });

  it('should handle unsuccessfully getting account overview information due to being unauthenticated', () => {
    return expectSaga(sagas.getAccountOverview)
      .provide([
        [
          matchers.call([Request, 'send'], RequestMethod.GET, '/account/overview'),
          Promise.reject(mockUnauthenticatedError)
        ]
      ])
      .put(getAccountOverviewAction.failure(mockUnauthenticatedError))
      .put(logOut())
      .run();
  });

  it('should handle redirecting successfully to the delivery page', () => {
    return expectSaga(sagas.handleRedirect)
      .provide([
        [matchers.select(selectors.hasUpcomingDelivery), true],
        [matchers.call(history.push, '/account/delivery'), noop]
      ])
      .run();
  });

  it('should handle redirecting successfully to the furniture page', () => {
    return expectSaga(sagas.handleRedirect)
      .provide([
        [matchers.select(selectors.hasUpcomingDelivery), false],
        [matchers.call(history.push, '/account/furniture'), noop]
      ])
      .run();
  });
});
