import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { handleToggleOverlay, setBodyOverflowStyle } from './overlay.sagas';
import { toggleOverlay, openOverlay, closeOverlay } from './overlay.actions';
import { getOpenOverlay } from './overlay.selectors';
import { Overlays } from './overlay.types';
import { QUIZ } from '../../../analytics/quiz/events';
import Analytics from '../../../analytics/analytics';
import { quizStepPayloadMapping } from '../../../analytics/quiz/payload-mappings';
import { noop } from '../../../utils/ui-helpers';

describe('Overlay Sagas', () => {
  describe('Handling the toggle overlay action', () => {
    describe('when opening an overlay', () => {
      it('should handle opening an overlay when there are no currently open overlays', () => {
        const action = toggleOverlay(Overlays.PlanSelectionOverlay, true);
        return expectSaga(handleToggleOverlay, action)
          .provide([[matchers.select(getOpenOverlay), null]])
          .put(openOverlay(Overlays.PlanSelectionOverlay))
          .run();
      });

      it('should handle opening an overlay that requires background scroll locking when there are no currently open overlays', () => {
        const action = toggleOverlay(Overlays.MiniCartOverlay, true);
        return expectSaga(handleToggleOverlay, action)
          .provide([
            [matchers.select(getOpenOverlay), null],
            [matchers.call(setBodyOverflowStyle, 'hidden'), noop]
          ])
          .put(openOverlay(Overlays.MiniCartOverlay))
          .run();
      });

      it('should handle opening an overlay and there is currently an overlay open that does not require background scroll locking', () => {
        const action = toggleOverlay(Overlays.PlanSelectionOverlay, true);
        return expectSaga(handleToggleOverlay, action)
          .provide([[matchers.select(getOpenOverlay), Overlays.AddItemsToCurrentPlanOverlay]])
          .put(closeOverlay(Overlays.AddItemsToCurrentPlanOverlay))
          .put(openOverlay(Overlays.PlanSelectionOverlay))
          .run();
      });

      it('should handle opening an overlay and there is currently an overlay open that requires background scroll locking', () => {
        const action = toggleOverlay(Overlays.PlanSelectionOverlay, true);
        return expectSaga(handleToggleOverlay, action)
          .provide([
            [matchers.select(getOpenOverlay), Overlays.MobileNavOverlay],
            [matchers.call(setBodyOverflowStyle, 'auto'), noop]
          ])
          .put(closeOverlay(Overlays.MobileNavOverlay))
          .put(openOverlay(Overlays.PlanSelectionOverlay))
          .run();
      });

      it('should handle opening an overlay that requires background scroll locking and there is currently an overlay open that also requires background scroll locking', () => {
        const action = toggleOverlay(Overlays.MiniCartOverlay, true);
        return expectSaga(handleToggleOverlay, action)
          .provide([
            [matchers.select(getOpenOverlay), Overlays.MobileNavOverlay],
            [matchers.call(setBodyOverflowStyle, 'auto'), noop],
            [matchers.call(setBodyOverflowStyle, 'hidden'), noop]
          ])
          .put(closeOverlay(Overlays.MobileNavOverlay))
          .put(openOverlay(Overlays.MiniCartOverlay))
          .run();
      });

      it('should handle opening the quiz overlay', () => {
        const action = toggleOverlay(Overlays.QuizOverlay, true);
        return expectSaga(handleToggleOverlay, action)
          .provide([
            [matchers.select(getOpenOverlay), null],
            [matchers.call(Analytics.trackEvent, QUIZ.OPEN), noop],
            [
              matchers.call(
                Analytics.trackEvent,
                QUIZ.STEP,
                quizStepPayloadMapping({ currentStep: 'select-location' })
              ),
              noop
            ]
          ])
          .run();
      });
    });

    describe('when closing an overlay', () => {
      it('should handle closing an overlay that does not require background scroll locking', () => {
        const action = toggleOverlay(Overlays.AddItemsToCurrentPlanOverlay, false);
        return expectSaga(handleToggleOverlay, action).put(closeOverlay(Overlays.AddItemsToCurrentPlanOverlay)).run();
      });

      it('should handle closing an overlay that requires background scroll locking', () => {
        const action = toggleOverlay(Overlays.MobileNavOverlay, false);
        return expectSaga(handleToggleOverlay, action)
          .provide([[matchers.call(setBodyOverflowStyle, 'auto'), noop]])
          .put(closeOverlay(Overlays.MobileNavOverlay))
          .run();
      });
    });
  });
});
