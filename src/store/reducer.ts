import { reducer as formReducer } from "redux-form";
// import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
// import { History } from "history";
import trackingParameters, {
  initialState as trackingParametersInitialState,
} from "../reducers/tracking-parameters";
import productDetails, {
  initialState as productDetailsInitialState,
} from "../oldPages/detailsPage/store/productDetails/product.reducer";
import productPairings, {
  initialState as productPairingsInitialState,
} from "../oldPages/detailsPage/store/productPairings/productPairings.reducer";
import quizPackages, {
  initialState as quizPackagesInitialState,
} from "../oldPages/detailsPage/components/packages/quizResults/store/quizResults.reducer";
import navigation, {
  initialState as navigationInitialState,
} from "../reducers/navigation";
import packages, {
  initialState as packagesInitialState,
} from "../reducers/packages";
import productList, {
  initialState as productListInitialState,
} from "../oldPages/productListing/store/productList.reducer";
import contact, {
  initialState as contactInitialState,
} from "../oldPages/contact/store/contact.reducer";
import search, {
  initialState as searchInitialState,
} from "../oldPages/search/store/search.reducer";
import cart, {
  initialState as cartInitialState,
} from "../oldPages/cart/store/cart.reducer";
import quiz, {
  initialState as quizInitialState,
} from "../oldPages/quiz/store/quiz.reducer";
import pkg, { initialState as pkgInitialState } from "../reducers/package";
import productEntities, {
  initialState as productEntitiesInitialState,
} from "../app/store/entities/entities.reducer";
import windowDimensions, {
  initialState as windowDimensionsInitialState,
} from "../app/store/dimensions/dimensions.reducer";
import newsletter, {
  initialState as newsletterInitialState,
} from "../app/store/newsletter-signup/newsletter.signup.reducer";
import navbar, {
  initialState as navbarInitialState,
} from "../app/store/navbar/navbar.reducer";
import overlay, {
  initialState as overlayInitialState,
} from "../app/store/overlay/overlay.reducer";
import accountHistory, {
  initialState as accountHistoryInitialState,
} from "../oldPages/account/accountHistory/store/account.history.reducer";
import personalInformation, {
  initialState as personalInformationInitialState,
} from "../oldPages/account/personalInformation/store/personal.information.reducer";
import billingInformation, {
  initialState as billingInformationInitialState,
} from "../oldPages/account/planAndBilling/store/billing.information.reducer";
import changePassword, {
  initialState as changePasswordInitialState,
} from "../oldPages/account/changePassword/store/change.password.reducer";
import auth, {
  initialState as authInitialState,
} from "../oldPages/auth/auth.reducer";
import accountOverview, {
  initialState as accountOverviewInitialState,
} from "../oldPages/account/accountOverview/store/account.overview.reducer";
import faq, {
  initialState as faqInitialState,
} from "../oldPages/FAQ/store/faqs.reducer";
import homepage, {
  initialState as homepageInitialState,
} from "../oldPages/homepage/store/homepage.reducer";
import about, {
  initialState as aboutInitialState,
} from "../oldPages/about/store/about.reducer";
import plan, {
  initialState as planInitialState,
} from "../app/store/plan/plan.reducer";
import checkout, {
  initialState as checkoutInitialState,
} from "../oldPages/checkout/store/checkout.reducer";
import howItWorks, {
  initialState as howItWorksInitialState,
} from "../oldPages/howItWorks/store/howItWorks.reducer";
import { State as GlobalState } from "../types/ReduxState";
import enterprise, {
  initialState as enterpriseInitialState,
} from "../oldPages/enterprise/store/enterprise.reducer";
import featherPerks, {
  initialState as featherPerksInitialState,
} from "../oldPages/account/featherPerks/store/featherPerks.reducer";
// import locationContent, {
//   initialState as locationInitialState,
// } from "../templates/location/store/location.reducer";
import contentfulPages, {
  initialState as contentfulPagesInitialState,
} from "../app/store/contentfulPages/pages.reducer";

export const initialState: GlobalState = {
  app: {
    productEntities: productEntitiesInitialState,
    windowDimensions: windowDimensionsInitialState,
    newsletter: newsletterInitialState,
    navbar: navbarInitialState,
    overlay: overlayInitialState,
    contentfulPages: contentfulPagesInitialState,
  },
  faq: faqInitialState,
  cart: cartInitialState,
  checkout: checkoutInitialState,
  quiz: quizInitialState,
  plan: planInitialState,
  auth: authInitialState,
  about: aboutInitialState,
  search: searchInitialState,
  contact: contactInitialState,
  howItWorks: howItWorksInitialState,
  navigation: navigationInitialState,
  productList: productListInitialState,
  enterprise: enterpriseInitialState,
  quizPackages: quizPackagesInitialState,
  productDetails: productDetailsInitialState,
  productPairings: productPairingsInitialState,
  trackingParameters: trackingParametersInitialState,
  entities: {
    pkg: pkgInitialState,
    packages: packagesInitialState,
  },
  accounts: {
    accountHistory: accountHistoryInitialState,
    changePassword: changePasswordInitialState,
    accountOverview: accountOverviewInitialState,
    billingInformation: billingInformationInitialState,
    personalInformation: personalInformationInitialState,
  },
  // router: {
  //   location: {
  //     pathname: "/",
  //     search: "",
  //     hash: "",
  //     state: "",
  //     query: {},
  //   },
  //   action: "POP",
  // },
  // locationContent: locationInitialState,
  homepage: homepageInitialState,
  featherPerks: featherPerksInitialState,
};

const createRootReducer = () =>
  combineReducers({
    app: combineReducers({
      productEntities,
      windowDimensions,
      newsletter,
      navbar,
      overlay,
      contentfulPages,
    }),
    faq,
    enterprise,
    cart,
    checkout,
    quiz,
    plan,
    about,
    search,
    contact,
    howItWorks,
    // locationContent,
    navigation,
    productList,
    quizPackages,
    productDetails,
    productPairings,
    form: formReducer,
    trackingParameters,
    // router: connectRouter(history),
    auth,
    entities: combineReducers({
      pkg,
      packages,
    }),
    accounts: combineReducers({
      accountHistory,
      changePassword,
      accountOverview,
      billingInformation,
      personalInformation,
    }),
    homepage,
    featherPerks,
  });

export default createRootReducer;
