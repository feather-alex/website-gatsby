import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { stopSubmit } from 'redux-form';
import { FluxStandardAction } from '../../../types/FluxStandardActions';
import Request, { RequestMethod } from '../../../api/request';
import { history } from '../../../store/history';
import { APIError } from '../../../types/ReduxState';
import { noop } from '../../../utils/ui-helpers';
import { ZipcodeRequestResource, ZipcodeResponseResource, MembershipState, DeliveryAreaIdentifier } from './plan.types';
import { zipcodeSubmit, zipcodeSubmitSuccess, zipcodeSubmitFailure, changeMembershipSelection } from './plan.actions';
import { handleZipcode, handleMembershipChange } from './plan.sagas';
import { getIsInDeliveryZone } from './plan.selectors';
import { toggleOverlay } from '../overlay/overlay.actions';
import { getIsPlanSelectionOverlayOpen } from '../overlay/overlay.selectors';
import { Overlays } from '../overlay/overlay.types';
import { getIsNavbarBannerVisible, getNavbarBannerType } from '../navbar/navbar.selectors';
import { dismissNavbarBanner, showNavbarBanner } from '../navbar/navbar.actions';
import Analytics from '../../../analytics/analytics';
import { BannerType } from '../navbar/navbar.types';
import { ZIPCODE } from '../../../analytics/zipcode/events';
import { enterZipcodePayloadMapping } from '../../../analytics/zipcode/payload-mappings';
import { normalizeCartPrices } from '../../../pages/cart/store/cart.actions';

describe('Plan - Sagas', () => {
  describe('Handle zip code', () => {
    it('should handle successfully submitting a zip code when the plan selection overlay is NOT open', () => {
      const zipcode: ZipcodeRequestResource = {
        zipcode: '10023',
        navigateToListing: true
      };

      const apiResponse: ZipcodeResponseResource = {
        postal: '10023',
        identifier: 'new-york'
      };

      const analyticsPayload = {
        zipcode: '10023',
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
        origin: 'product details page form'
      };

      const action: FluxStandardAction = zipcodeSubmit(zipcode);

      return expectSaga(handleZipcode, action)
        .withState({ router: { location: { pathname: '/products' } } })
        .provide([
          [matchers.select(getIsPlanSelectionOverlayOpen), false],
          [matchers.select(getIsNavbarBannerVisible), false],
          [matchers.select(getNavbarBannerType), null],
          [matchers.call([Request, 'send'], RequestMethod.GET, '/delivery/postal/10023'), apiResponse],
          [matchers.call(history.push, '/products'), noop],
          [matchers.call(Analytics.trackEvent, ZIPCODE.ENTER, enterZipcodePayloadMapping(analyticsPayload)), noop]
        ])
        .put(zipcodeSubmitSuccess(apiResponse))
        .run();
    });

    it('should handle successfully submitting a zip code when the plan selection overlay is open', () => {
      const zipcode: ZipcodeRequestResource = {
        zipcode: '10023',
        navigateToListing: true
      };

      const apiResponse: ZipcodeResponseResource = {
        postal: '10023',
        identifier: 'new-york'
      };

      const analyticsPayload = {
        zipcode: '10023',
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
        origin: 'product details page form'
      };

      const action: FluxStandardAction = zipcodeSubmit(zipcode);

      return expectSaga(handleZipcode, action)
        .withState({ router: { location: { pathname: '/products' } } })
        .provide([
          [matchers.select(getIsPlanSelectionOverlayOpen), true],
          [matchers.select(getIsNavbarBannerVisible), false],
          [matchers.select(getNavbarBannerType), null],
          [matchers.call([Request, 'send'], RequestMethod.GET, '/delivery/postal/10023'), apiResponse],
          [matchers.call(history.push, '/products'), noop],
          [matchers.call(Analytics.trackEvent, ZIPCODE.ENTER, enterZipcodePayloadMapping(analyticsPayload)), noop]
        ])
        .put(zipcodeSubmitSuccess(apiResponse))
        .put(toggleOverlay(Overlays.PlanSelectionOverlay, false))
        .run();
    });

    it('should handle successfully submitting a zip code when the action payload includes shouldSelectPlan', () => {
      const zipcode: ZipcodeRequestResource = {
        zipcode: '10023',
        shouldSelectPlan: MembershipState.MEMBER
      };

      const apiResponse: ZipcodeResponseResource = {
        postal: '10023',
        identifier: 'new-york'
      };

      const analyticsPayload = {
        zipcode: '10023',
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
        origin: 'product details page form'
      };

      const action: FluxStandardAction = zipcodeSubmit(zipcode);

      return expectSaga(handleZipcode, action)
        .withState({ router: { location: { pathname: '/products' } } })
        .provide([
          [matchers.select(getIsPlanSelectionOverlayOpen), false],
          [matchers.select(getIsNavbarBannerVisible), false],
          [matchers.select(getNavbarBannerType), null],
          [matchers.call([Request, 'send'], RequestMethod.GET, '/delivery/postal/10023'), apiResponse],
          [matchers.call(Analytics.trackEvent, ZIPCODE.ENTER, enterZipcodePayloadMapping(analyticsPayload)), noop]
        ])
        .put(zipcodeSubmitSuccess(apiResponse))
        .put(changeMembershipSelection(MembershipState.MEMBER))
        .run();
    });

    it('should handle unsuccessfully submitting a zip code', () => {
      const zipcode: ZipcodeRequestResource = {
        zipcode: '10023',
        navigateToListing: true
      };

      const apiError: APIError = {
        error: 'This is an error',
        message: 'Something bad happened',
        status: 400
      };

      const action: FluxStandardAction = zipcodeSubmit(zipcode);

      return expectSaga(handleZipcode, action)
        .withState({ router: { location: { pathname: '/products' } } })
        .provide([
          [matchers.call([Request, 'send'], RequestMethod.GET, '/delivery/postal/10023'), Promise.reject(apiError)]
        ])
        .put(zipcodeSubmitFailure(apiError))
        .run();
    });

    it('should handle unsuccessfully submitting a zip code and show an error', () => {
      const zipcode: ZipcodeRequestResource = {
        zipcode: '10023',
        shouldShowError: true
      };

      const apiError: APIError = {
        error: 'This is an error',
        message: 'Something bad happened',
        status: 400
      };

      const analyticsPayload = {
        zipcode: '10023',
        deliveryAreaIdentifier: DeliveryAreaIdentifier.NY,
        origin: 'product details page form'
      };

      const action: FluxStandardAction = zipcodeSubmit(zipcode);

      return expectSaga(handleZipcode, action)
        .withState({ router: { location: { pathname: '/products' } } })
        .provide([
          [matchers.call([Request, 'send'], RequestMethod.GET, '/delivery/postal/10023'), Promise.reject(apiError)],
          [matchers.put(stopSubmit('planForm', { zipcode: 'outside delivery area' })), noop],
          [matchers.call(Analytics.trackEvent, ZIPCODE.ENTER, enterZipcodePayloadMapping(analyticsPayload)), noop]
        ])
        .put(zipcodeSubmitFailure(apiError))
        .run();
    });
  });

  describe('Handling membership change', () => {
    it('should handle when there is a change to membership, zip code is in delivery zone, and the overlay is not visible', () => {
      const action = changeMembershipSelection(MembershipState.MEMBER);
      return expectSaga(handleMembershipChange, action)
        .withState({ router: { location: { pathname: '/products' } } })
        .provide([
          [matchers.select(getIsNavbarBannerVisible), false],
          [matchers.select(getNavbarBannerType), null],
          [matchers.select(getIsPlanSelectionOverlayOpen), false],
          [matchers.select(getIsInDeliveryZone), true],
          [matchers.call(history.push, '/products'), noop]
        ])
        .put(
          showNavbarBanner({
            bannerType: BannerType.Success,
            message: 'You’ve selected Membership : start choosing items to add to your plan!'
          })
        )
        .put(normalizeCartPrices(action.payload.membershipState))
        .put(dismissNavbarBanner())
        .run(3100);
    });

    it('should handle when there is a change to non-membership, zip code is in delivery zone, and the overlay is not visible', () => {
      const action = changeMembershipSelection(MembershipState.NON_MEMBER);
      return expectSaga(handleMembershipChange, action)
        .withState({ router: { location: { pathname: '/products' } } })
        .provide([
          [matchers.select(getIsNavbarBannerVisible), false],
          [matchers.select(getNavbarBannerType), null],
          [matchers.select(getIsPlanSelectionOverlayOpen), false],
          [matchers.select(getIsInDeliveryZone), true],
          [matchers.call(history.push, '/products'), noop]
        ])
        .put(
          showNavbarBanner({
            bannerType: BannerType.Success,
            message: 'You’ve selected Short-Term Plan : start choosing items to add to your plan!'
          })
        )
        .put(normalizeCartPrices(action.payload.membershipState))
        .put(dismissNavbarBanner())
        .run(3100);
    });

    it('should handle when there is a change to non-membership, zip code is NOT in delivery zone, and the overlay is not visible', () => {
      const action = changeMembershipSelection(MembershipState.NON_MEMBER);
      return expectSaga(handleMembershipChange, action)
        .withState({ router: { location: { pathname: '/products' } } })
        .provide([
          [matchers.select(getIsNavbarBannerVisible), false],
          [matchers.select(getNavbarBannerType), null],
          [matchers.select(getIsPlanSelectionOverlayOpen), false],
          [matchers.select(getIsInDeliveryZone), false],
          [matchers.call(history.push, '/products'), noop]
        ])
        .run();
    });

    it('should handle when there is a change to membership and the plan selection overlay is open', () => {
      const action = changeMembershipSelection(MembershipState.MEMBER);
      return expectSaga(handleMembershipChange, action)
        .withState({ router: { location: { pathname: '/products' } } })
        .provide([
          [matchers.select(getIsNavbarBannerVisible), false],
          [matchers.select(getNavbarBannerType), null],
          [matchers.select(getIsPlanSelectionOverlayOpen), true],
          [matchers.select(getIsInDeliveryZone), true],
          [matchers.call(history.push, '/products'), noop]
        ])
        .put(toggleOverlay(Overlays.PlanSelectionOverlay, false))
        .put(
          showNavbarBanner({
            bannerType: BannerType.Success,
            message: 'You’ve selected Membership : start choosing items to add to your plan!'
          })
        )
        .put(normalizeCartPrices(action.payload.membershipState))
        .put(dismissNavbarBanner())
        .run(3100);
    });

    // although the UI does not support this case, I'm still testing it
    it('should handle when there is a change to deselect any plan', () => {
      const action = changeMembershipSelection(MembershipState.NONE);
      return expectSaga(handleMembershipChange, action)
        .withState({ router: { location: { pathname: '/products' } } })
        .provide([
          [matchers.select(getIsNavbarBannerVisible), false],
          [matchers.select(getNavbarBannerType), null],
          [matchers.select(getIsPlanSelectionOverlayOpen), false],
          [matchers.select(getIsInDeliveryZone), true],
          [matchers.call(history.push, '/products'), noop]
        ])
        .run();
    });
  });
});
