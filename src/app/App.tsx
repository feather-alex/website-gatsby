import React from "react";
import { polyfill } from "smoothscroll-polyfill";
import { connect } from "react-redux";
import { Router, Route } from "@reach/router";
import {
  handleWindowResize,
  HandleWindowResize,
} from "./store/dimensions/dimensions.actions";
import {
  getIsFetchingProductEntities,
  getProductEntities,
} from "./store/entities/entities.selectors";
import { State as GlobalState } from "../types/ReduxState";
import { getEntitiesRequest } from "../app/store/entities/entities.actions";
import Homepage from "../oldPages/homepage/Homepage";
import HowItWorksPage from "../oldPages/howItWorks/HowItWorks";
import ProductsListingPage from "../oldPages/productListing/ProductListingPage";
import PackagesListingPage from "../oldPages/packageListing/PackageListing";
import { ActionCreator } from "../types/FluxStandardActions";
import LoginPage from "../oldPages/auth/login/Login";
import LazyLoading from "../components/LazyLoading";
import SearchPage from "../oldPages/search/Search";
import StyleQuizPage from "../oldPages/quiz/Quiz";
import OverlayContainer from "./OverlayContainer";
import { ProductEntities } from "./store/entities/entities.types";
import { history } from "../store/history";
import {
  showNavbarBanner,
  dismissNavbarBanner,
  getMobileNavContent,
} from "./store/navbar/navbar.actions";
import {
  BannerType,
  ShowNavbarBannerPayload,
  MobileNavContentRequestPayload,
} from "./store/navbar/navbar.types";
import ErrorBoundary from "../components/ErrorBoundary";
import {
  checkAuthentication,
  CheckAuthentication,
} from "../oldPages/auth/login/store/login.actions";
import FeatherFurniture from "../oldPages/featherFurniture/FeatherFurniture";
import {
  getDeliveryZipCode,
  getIsInDeliveryZone,
  getIsEmailSubmitted,
} from "./store/plan/plan.selectors";
import Enterprise from "../oldPages/enterprise/Enterprise";
import InYourArea from "../oldPages/inYourArea/InYourArea";
import Floyd from "../oldPages/floyd/Floyd";
// import LocationTemplate from "../templates/location/LocationTemplate";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { getContentfulPages } from "./store/contentfulPages/pages.actions";
import { Pages, CONTENTFUL_IDS } from "../contentful/contentful.types";
import {
  getPages,
  getIsFetchingPages,
} from "./store/contentfulPages/pages.selectors";
import Loading from "../components/Loading";
import styled from "@emotion/styled";

const FAQPage = React.lazy(() => import("../oldPages/FAQ/FAQ"));
const CartPage = React.lazy(() => import("../oldPages/cart/Cart"));
const FourOhFour = React.lazy(() => import("../oldPages/404"));
const ContactPage = React.lazy(() => import("../oldPages/contact/Contact"));
const ReviewsPage = React.lazy(() => import("../oldPages/reviews/Reviews"));
const AboutPage = React.lazy(() => import("../oldPages/about/About"));
// const CheckoutPage = React.lazy(() => import("../oldPages/checkout/Checkout"));
const CreditCheck = React.lazy(() =>
  import("../oldPages/checkout/components/CreditCheckDenied")
);
const OFACCheckFailed = React.lazy(() =>
  import("../oldPages/checkout/components/OFACCheckFailed")
);
const PrivacyPolicyPage = React.lazy(() =>
  import("../oldPages/legal/PrivacyPolicy")
);
const ProductDetailsPage = React.lazy(() =>
  import("../oldPages/detailsPage/ProductDetailsPage")
);
const CheckoutSuccessPage = React.lazy(() =>
  import("../oldPages/checkout/CheckoutSuccess")
);
const DepositRequestSuccessPage = React.lazy(() =>
  import("../oldPages/checkout/DepositRequestSuccess")
);
const TermsAndConditionsPage = React.lazy(() =>
  import("../oldPages/legal/TermsAndConditions")
);
const CuratedPackagePage = React.lazy(() =>
  import("../oldPages/detailsPage/CuratedPackage")
);
const QuizLoadingScreen = React.lazy(() =>
  import("../oldPages/quiz/components/QuizLoadingScreen")
);
const QuizResults = React.lazy(() =>
  import("../oldPages/detailsPage/QuizResults")
);
const ForgotPasswordPage = React.lazy(() =>
  import("../oldPages/auth/forgotPassword/ForgotPassword")
);
const RegisterPage = React.lazy(() =>
  import("../oldPages/auth/register/Register")
);
const VerificationPage = React.lazy(() =>
  import("../oldPages/auth/verification/Verification")
);
const AccountPage = React.lazy(() => import("../oldPages/account/Account"));
const LeaseSignedConfirmation = React.lazy(() =>
  import("../oldPages/checkout/LeaseSignedConfirmation")
);

const LoadingContainer = styled.div`
  height: 100vh;
`;

interface MatchParams {
  productIdentifier: string;
}

interface Props {
  isFetchingEntities: boolean;
  productEntities: ProductEntities;
  getEntitiesRequest: ActionCreator;
  handleWindowResize: HandleWindowResize;
  showNavbarBanner: ActionCreatorWithPayload<ShowNavbarBannerPayload>;
  dismissNavbarBanner: ActionCreator;
  checkAuthentication: CheckAuthentication;
  postalCode: string | null;
  isInDeliveryZone: boolean;
  isEmailSubmitted: boolean;
  getContentfulPagesRequest: ActionCreatorWithoutPayload;
  contentfulPages: Pages[];
  isFetchingPages: boolean;
  getMobileNavContentRequest: ActionCreatorWithPayload<
    MobileNavContentRequestPayload
  >;
}

// const processContentfulPages = (
//   id: string,
//   slug: string
// ): (() => JSX.Element) => () => (
//   <LocationTemplate contentfulId={id} slug={slug} />
// );

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.getEntitiesRequest();
    this.props.checkAuthentication();
    this.props.getContentfulPagesRequest();
    this.props.getMobileNavContentRequest({ id: CONTENTFUL_IDS.MOBILE_NAV });

    setTimeout(() => {
      const { postalCode, isInDeliveryZone, isEmailSubmitted } = this.props;
      if (
        !location.pathname.match(
          /\/login|\/account|\/setup-account|\/verify|\/forgot-password/
        )
      ) {
        if (postalCode && !isInDeliveryZone && !isEmailSubmitted) {
          this.props.showNavbarBanner({
            bannerType: BannerType.ZipCodeFailure,
          });
        } else if (!postalCode) {
          this.props.showNavbarBanner({ bannerType: BannerType.ZipCode });
        }
      }
    }, 4000);

    polyfill();

    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize = (event: Event) => {
    const windowObject = event.currentTarget as Window;

    this.props.handleWindowResize(
      windowObject.innerHeight,
      windowObject.innerWidth
    );
  };

  waitForProductEntities = (component: JSX.Element) => () => {
    const { isFetchingEntities } = this.props;

    return isFetchingEntities ? <LazyLoading /> : component;
  };

  // This method is used to differentiate product category pages
  // (i.e. `/products/living-room`) from product details pages
  // (i.e. `/products/athene-chair`).
  renderProductDetails = (
    routeProps: RouteComponentProps<MatchParams>
  ): JSX.Element => {
    const { productEntities, isFetchingEntities } = this.props;

    // We can't render these components without first receiving
    // necessary data from the `/entities` request. If that hasn't
    // happened yet, don't render anything.
    if (isFetchingEntities || !productEntities) {
      return <LazyLoading />;
    }

    // Provides us with an array of category identifiers.
    // ['living-room', 'dining-room', 'bedroom', etc.]

    // Hardcoded until API is updated:
    const newCategoriesIdentifiers: string[] = [
      "sofas",
      "chairs",
      "coffee-tables",
      "side-tables",
      "ottomans-stools-benches",
      "beds-mattresses",
      "dressers",
      "dining-tables",
      "dining-chairs-stools",
      "storage",
      "desks-chairs-shelves",
      "rugs-artwork",
      "bar-cart-storage",
      "desk-office-chairs",
    ];
    const allProductCategories: string[] = [
      ...productEntities.categories.products.map(
        (category) => category.identifier
      ),
      ...newCategoriesIdentifiers,
    ];

    // Provides us with the `productIdentifier` url parameter.
    // i.e. 'living-room', 'athene-chair', etc.
    const { productIdentifier } = routeProps.match.params;

    // Is the `productIdentifier` param actually just a product category?
    const isProductCategory: boolean = allProductCategories.includes(
      productIdentifier
    );

    // If so, render the product listing page.
    if (isProductCategory) {
      return <ProductsListingPage />;
    }

    // Otherwise, this is a product details page.
    return <ProductDetailsPage />;
  };

  render() {
    return this.props.isFetchingPages ? (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    ) : (
      <Router>
        <ErrorBoundary>
          <React.Suspense fallback={<LazyLoading />}>
            <Switch>
              <Route exact={true} path="/" component={Homepage} />
              <Route
                path="/products/:productIdentifier"
                render={this.renderProductDetails}
              />
              <Route
                path="/products"
                render={this.waitForProductEntities(<ProductsListingPage />)}
              />
              <Route
                path="/packages/:packageIdentifier"
                render={this.waitForProductEntities(<CuratedPackagePage />)}
              />
              <Route path="/packages" component={PackagesListingPage} />
              <Route path="/cart" component={CartPage} />
              <Route
                path="/lease-signed-success"
                component={LeaseSignedConfirmation}
              />
              {/* <Route
                path="/checkout"
                render={this.waitForProductEntities(<CheckoutPage />)}
              /> */}
              <Route path="/credit-check" component={CreditCheck} />
              <Route path="/ofac-check" component={OFACCheckFailed} />
              <Route
                path="/checkout-success/:confirmationNumber"
                component={CheckoutSuccessPage}
              />
              <Route
                path="/deposit-request"
                component={DepositRequestSuccessPage}
              />
              <Route path="/contact" component={ContactPage} />
              <Route
                path="/how-it-works"
                render={this.waitForProductEntities(<HowItWorksPage />)}
              />
              <Route path="/faqs" component={FAQPage} />
              <Route path="/reviews" component={ReviewsPage} />
              <Route path="/search" component={SearchPage} />
              <Route
                path="/terms-and-conditions"
                component={TermsAndConditionsPage}
              />
              <Route path="/privacy-policy" component={PrivacyPolicyPage} />
              <Route path="/about" component={AboutPage} />
              <Route
                path="/style-quiz"
                render={this.waitForProductEntities(<StyleQuizPage />)}
              />
              <Route
                path="/make-your-own-package"
                component={QuizLoadingScreen}
              />
              <Route path="/quiz-results/:uuid" component={QuizResults} />
              <Route path="/account" component={AccountPage} />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <Route path="/setup-account" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/verify" component={VerificationPage} />
              <Route path="/feather-furniture" component={FeatherFurniture} />
              <Route path="/office" component={Enterprise} />
              <Route path="/floyd" component={Floyd} />
              <Route path="/in-your-area" component={InYourArea} />
              {/* {this.props.contentfulPages.map((page) => (
                <Route
                  key={page.slug}
                  path={page.slug}
                  render={processContentfulPages(page.pageId, page.slug)}
                />
              ))} */}
              <Redirect from="/business" to="/office" />
              <Route path="*" component={FourOhFour} />
            </Switch>
          </React.Suspense>
        </ErrorBoundary>
        <OverlayContainer />
      </Router>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  productEntities: getProductEntities(state),
  isFetchingEntities: getIsFetchingProductEntities(state),
  postalCode: getDeliveryZipCode(state),
  isInDeliveryZone: getIsInDeliveryZone(state),
  isEmailSubmitted: getIsEmailSubmitted(state),
  contentfulPages: getPages(state),
  isFetchingPages: getIsFetchingPages(state),
});

const mapDispatchToProps = {
  getEntitiesRequest,
  handleWindowResize,
  showNavbarBanner,
  dismissNavbarBanner,
  checkAuthentication,
  getContentfulPagesRequest: getContentfulPages.request,
  getMobileNavContentRequest: getMobileNavContent.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
