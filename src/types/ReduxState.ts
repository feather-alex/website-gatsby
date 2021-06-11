// import { RouterState } from "connected-react-router";
import { ProductEntitiesState } from "../app/store/entities/entities.types";
import { DimensionsState } from "../app/store/dimensions/dimensions.types";
import { NewsletterState } from "../app/store/newsletter-signup/newsletter.signup.types";
import { NavbarState } from "../app/store/navbar/navbar.types";
import { OverlayState } from "../app/store/overlay/overlay.types";
import { ProductListResponse, IdentifierAndName } from "./Product";
import { TrackingParameters } from "./TrackingParameters";
import { ProductDetailsState } from "../oldPages/detailsPage/store/productDetails/product.types";
import { ContactState } from "../oldPages/contact/store/contact.types";
import { QuizResultsState } from "../oldPages/detailsPage/components/packages/quizResults/store/quizResults.types";
import { FaqContentState } from "../oldPages/FAQ/store/faqs.types";
import { Search } from "../oldPages/search/store/search.types";
import { Quiz } from "../oldPages/quiz/store/quiz.types";
import { Cart } from "../oldPages/cart/store/cart.types";
import { FullPackageDetails, PackageForListing } from "./Package";
import {
  AccountOverview,
  PersonalInformation,
  AccountHistory,
  ChangePassword,
  BillingInformation,
} from "./Account";
import { ForgotPassword } from "../oldPages/auth/forgotPassword/store/forgot.password.types";
import { Login } from "../oldPages/auth/login/store/login.types";
import { Register } from "../oldPages/auth/register/store/register.types";
import { Verification } from "../oldPages/auth/verification/store/verification.types";
import { About } from "../oldPages/about/store/about.types";
import { DeliveryAreaIdentifier, Plan } from "../app/store/plan/plan.types";
import { ProductPairingsState } from "../oldPages/detailsPage/store/productPairings/productPairings.types";
import { ProductListState } from "../oldPages/productListing/store/productList.types";
import { CheckoutState } from "../oldPages/checkout/store/checkout.types";
import { HomepageContentState } from "../oldPages/homepage/store/homepage.types";
import { HowItWorksState } from "../oldPages/howItWorks/store/howItWorks.types";
import { EnterpriseContentState } from "../oldPages/enterprise/store/enterprise.types";
import { FeatherPerksContentState } from "../oldPages/account/featherPerks/store/featherPerks.types";
// import { LocationContentState } from "../templates/location/store/location.types";
import { ContentfulPagesState } from "../app/store/contentfulPages/pages.types";

export interface State {
  accounts: Accounts;
  auth: Auth;
  app: AppState;
  cart: Cart;
  checkout: CheckoutState;
  quiz: Quiz;
  quizPackages: QuizResultsState;
  entities: Entities;
  productDetails: ProductDetailsState;
  trackingParameters: TrackingParameters;
  search: Search;
  navigation: Navigation;
  // router: RouterState;
  contact: ContactState;
  faq: FaqContentState;
  enterprise: EnterpriseContentState;
  // locationContent: LocationContentState;
  plan: Plan;
  about: About;
  productPairings: ProductPairingsState;
  productList: ProductListState;
  homepage: HomepageContentState;
  howItWorks: HowItWorksState;
  featherPerks: FeatherPerksContentState;
}

export type V3State = State & {
  membership: {
    cartMinimum: 29 | 99 | null;
    deliveryFee: 0 | 99 | null;
    rentalLength: 3 | 12 | null;
    isMembershipSelected: boolean;
    monthlyMembershipFee: 0 | 19 | null;
  };
  navigation: {
    postal: string;
    deliverToPostal: boolean;
    hasEnteredEmail: boolean;
    displayWeDeliver: boolean;
    displayNoDelivery: boolean;
    displayEmailInput: boolean;
    invalidPostalInput: boolean;
    displayPostalInput: boolean;
    customerCanCheckout: boolean;
    deliveryAreaIdentifier: DeliveryAreaIdentifier;
    displayInitialGreeting: boolean;
    displayNavigationBanner: boolean;
  };
  plan: undefined;
};

export type PreviousQuizState = State & {
  quiz: Quiz & { currentStep: number; currentBedroom: number };
};

export interface AppState {
  windowDimensions: DimensionsState;
  productEntities: ProductEntitiesState;
  newsletter: NewsletterState;
  navbar: NavbarState;
  overlay: OverlayState;
  contentfulPages: ContentfulPagesState;
}

export interface Auth {
  forgotPassword: ForgotPassword;
  login: Login;
  register: Register;
  verification: Verification;
}

export interface Accounts {
  accountHistory: AccountHistory;
  accountOverview: AccountOverview;
  billingInformation: BillingInformation;
  personalInformation: PersonalInformation;
  changePassword: ChangePassword;
}

export interface Entities {
  packages: Entity<PackageForListing>;
  pkg: ObjEntity<FullPackageDetails>;
}

export interface ObjEntity<T> {
  isFetching: boolean;
  error: APIError | null;
  data: T;
}

export interface Entity<T = {}> {
  isFetching: boolean;
  error: Error | null;
  data: Array<T>;
}

export interface APIError {
  error: string;
  message: string;
  status: string | number;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

export interface Meta {
  pageNumber: number | 0;
  total: number | 0;
  availableFilters: {
    subclasses: IdentifierAndName[];
    classes: IdentifierAndName[];
    brands: IdentifierAndName[];
  };
}

export interface Action {
  type: string;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: ProductListResponse | any;
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  isInfiniteLoading?: boolean;
}

export interface Navigation {
  postal: string | null;
  deliveryAreaIdentifier: DeliveryAreaIdentifier | null;
  deliverToPostal: boolean;
  hasEnteredEmail: boolean;
  displayWeDeliver: boolean;
  displayNoDelivery: boolean;
  displayPostalInput: boolean;
  invalidPostalInput: boolean;
  customerCanCheckout: boolean;
  displayNavigationBanner: boolean;
  displayInitialGreeting: boolean;
  displayEmailInput: boolean;
}

export interface GlobalAesthetics {
  isNavigationTransparent: boolean;
}
