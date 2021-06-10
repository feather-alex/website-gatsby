import personalInformationWatcher from '../pages/account/personalInformation/store/personal.information.sagas';
import accountHistoryWatcher from '../pages/account/accountHistory/store/account.history.sagas';
import accountOverviewWatcher from '../pages/account/accountOverview/store/account.overview.sagas';
import billingInformationWatcher from '../pages/account/planAndBilling/store/billing.information.sagas';
import changePasswordWatcher from '../pages/account/changePassword/store/change.password.sagas';
import productDetailsWatcher from '../pages/detailsPage/store/productDetails/product.sagas';
import productPairingsWatcher from '../pages/detailsPage/store/productPairings/productPairings.sagas';
import dimensionsWatcher from '../app/store/dimensions/dimensions.sagas';
import contactWatcher from '../pages/contact/store/contact.sagas';
import entitiesWatcher from '../app/store/entities/entities.sagas';
import searchWatcher from '../pages/search/store/search.sagas';
import cartWatcher from '../pages/cart/store/cart.sagas';
import forgotPasswordWatcher from '../pages/auth/forgotPassword/store/forgot.password.sagas';
import loginWatcher from '../pages/auth/login/store/login.sagas';
import registerWatcher from '../pages/auth/register/store/register.sagas';
import verificationWatcher from '../pages/auth/verification/store/verification.sagas';
import newsletterWatcher from '../app/store/newsletter-signup/newsletter.signup.sagas';
import aboutWatcher from '../pages/about/store/about.sagas';
import navbarWatcher from '../app/store/navbar/navbar.sagas';
import planWatcher from '../app/store/plan/plan.sagas';
import overlayWatcher from '../app/store/overlay/overlay.sagas';
import quizWatcher from '../pages/quiz/store/quiz.sagas';
import { all } from 'redux-saga/effects';
import quizResultsWatcher from '../pages/detailsPage/components/packages/quizResults/store/quizResults.sagas';
import productListWatcher from '../pages/productListing/store/productList.sagas';
import checkoutWatcher from '../pages/checkout/store/checkout.sagas';
import faqsWatcher from '../pages/FAQ/store/faqs.sagas';
import homepageWatcher from '../pages/homepage/store/homepage.sagas';
import howItWorksWatcher from '../pages/howItWorks/store/howItWorks.sagas';
import contentfulEnterpriseWatcher from '../pages/enterprise/store/enterprise.sagas';
import featherPerksWatcher from '../pages/account/featherPerks/store/featherPerks.sagas';
import contentfulLocationWatcher from '../templates/location/store/location.sagas';
import contentfulPagesWatcher from '../app/store/contentfulPages/pages.sagas';

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
    contentfulLocationWatcher(),
    contentfulPagesWatcher()
  ]);
}
