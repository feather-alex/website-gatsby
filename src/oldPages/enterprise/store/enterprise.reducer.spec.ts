import {
  mockRequestPayload,
  mockSuccessPayload,
  mockError,
} from "./enterprise.fixtures";
import enterpriseReducer, { initialState } from "./enterprise.reducer";
import { getEnterpriseContent } from "./enterprise.actions";
import { EnterpriseContentState } from "./enterprise.types";

describe("Enterprise - Reducer", () => {
  let state: EnterpriseContentState;

  beforeEach(() => (state = { ...initialState }));

  it("Should handle action: GET_ENTERPRISE_REQUEST", () => {
    const action = getEnterpriseContent.request(mockRequestPayload);
    const reduced = enterpriseReducer(state, action);

    expect(reduced.isFetching).toEqual(true);
    expect(reduced.faqs).toEqual([]);
    expect(reduced.meta).toBeNull();
    expect(reduced.heroLockup).toBeNull();
    expect(reduced.horizontalLockup).toBeNull();
    expect(reduced.horizontalLockup2).toBeNull();
    expect(reduced.productShowcase).toBeNull();
    expect(reduced.titleButtonLockup).toBeNull();
    expect(reduced.titledTripleVerticalImageLockup).toBeNull();
    expect(reduced.error).toBeNull();
  });

  it("Should handle action: GET_ENTERPRISE_SUCCESS", () => {
    const action = getEnterpriseContent.success(mockSuccessPayload);

    const reduced = enterpriseReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.faqs).toEqual(mockSuccessPayload.faqs);
    expect(reduced.meta).toEqual(mockSuccessPayload.meta);
    expect(reduced.heroLockup).toEqual(mockSuccessPayload.heroLockup);
    expect(reduced.horizontalLockup).toEqual(
      mockSuccessPayload.horizontalLockup
    );
    expect(reduced.horizontalLockup2).toEqual(
      mockSuccessPayload.horizontalLockup2
    );
    expect(reduced.productShowcase).toEqual(mockSuccessPayload.productShowcase);
    expect(reduced.titleButtonLockup).toEqual(
      mockSuccessPayload.titleButtonLockup
    );
    expect(reduced.titledTripleVerticalImageLockup).toEqual(
      mockSuccessPayload.titledTripleVerticalImageLockup
    );
    expect(reduced.error).toBeNull();
  });

  it("Should handle action: GET_ENTERPRISE_FAILURE", () => {
    const action = getEnterpriseContent.failure(mockError);

    const reduced = enterpriseReducer(state, action);

    expect(reduced.isFetching).toEqual(false);
    expect(reduced.faqs).toEqual([]);
    expect(reduced.meta).toEqual(null);
    expect(reduced.meta).toBeNull();
    expect(reduced.heroLockup).toBeNull();
    expect(reduced.horizontalLockup).toBeNull();
    expect(reduced.horizontalLockup2).toBeNull();
    expect(reduced.productShowcase).toBeNull();
    expect(reduced.titleButtonLockup).toBeNull();
    expect(reduced.titledTripleVerticalImageLockup).toBeNull();
    expect(reduced.error).toEqual(mockError);
  });
});
