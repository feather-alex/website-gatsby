import personalInformationWatcher from "../oldPages/account/personalInformation/store/personal.information.sagas";
import accountHistoryWatcher from "../oldPages/account/accountHistory/store/account.history.sagas";
import accountOverviewWatcher from "../oldPages/account/accountOverview/store/account.overview.sagas";
import billingInformationWatcher from "../oldPages/account/planAndBilling/store/billing.information.sagas";
import changePasswordWatcher from "../oldPages/account/changePassword/store/change.password.sagas";
import productDetailsWatcher from "../oldPages/detailsPage/store/productDetails/product.sagas";
import productPairingsWatcher from "../oldPages/detailsPage/store/productPairings/productPairings.sagas";
import dimensionsWatcher from "../app/store/dimensions/dimensions.sagas";
import contactWatcher from "../oldPages/contact/store/contact.sagas";
import entitiesWatcher from "../app/store/entities/entities.sagas";
import searchWatcher from "../oldPages/search/store/search.sagas";
import cartWatcher from "../oldPages/cart/store/cart.sagas";
import forgotPasswordWatcher from "../oldPages/auth/forgotPassword/store/forgot.password.sagas";
import loginWatcher from "../oldPages/auth/login/store/login.sagas";
import registerWatcher from "../oldPages/auth/register/store/register.sagas";
import verificationWatcher from "../oldPages/auth/verification/store/verification.sagas";
import newsletterWatcher from "../app/store/newsletter-signup/newsletter.signup.sagas";
import aboutWatcher from "../oldPages/about/store/about.sagas";
import navbarWatcher from "../app/store/navbar/navbar.sagas";
import planWatcher from "../app/store/plan/plan.sagas";
import overlayWatcher from "../app/store/overlay/overlay.sagas";
import quizWatcher from "../oldPages/quiz/store/quiz.sagas";
import { all } from "redux-saga/effects";
import quizResultsWatcher from "../oldPages/detailsPage/components/packages/quizResults/store/quizResults.sagas";
import productListWatcher from "../oldPages/productListing/store/productList.sagas";
import checkoutWatcher from "../oldPages/checkout/store/checkout.sagas";
import faqsWatcher from "../oldPages/FAQ/store/faqs.sagas";
import homepageWatcher from "../oldPages/homepage/store/homepage.sagas";
import howItWorksWatcher from "../oldPages/howItWorks/store/howItWorks.sagas";
import contentfulEnterpriseWatcher from "../oldPages/enterprise/store/enterprise.sagas";
import featherPerksWatcher from "../oldPages/account/featherPerks/store/featherPerks.sagas";
// import contentfulLocationWatcher from "../templates/location/store/location.sagas";
import contentfulPagesWatcher from "../app/store/contentfulPages/pages.sagas";

export default function* root() {
  yield all([
    cartWatcher(),
    changePasswordWatcher(),
    forgotPasswordWatcher(),
    loginWatcher(),
    registerWatcher(),
    verificationWatcher(),
    billingInformationWatcher(),
    searchWatcher(),
    contactWatcher(),
    entitiesWatcher(),
    dimensionsWatcher(),
    accountHistoryWatcher(),
    accountOverviewWatcher(),
    personalInformationWatcher(),
    productDetailsWatcher(),
    productPairingsWatcher(),
    newsletterWatcher(),
    planWatcher(),
    aboutWatcher(),
    navbarWatcher(),
    overlayWatcher(),
    quizWatcher(),
    quizResultsWatcher(),
    productListWatcher(),
    checkoutWatcher(),
    faqsWatcher(),
    homepageWatcher(),
    howItWorksWatcher(),
    contentfulEnterpriseWatcher(),
    featherPerksWatcher(),
    // contentfulLocationWatcher(),
    contentfulPagesWatcher(),
  ]);
}
