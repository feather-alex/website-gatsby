import * as Sentry from "@sentry/browser";

const environment = process.env.REACT_APP_FEATHER_ENV || "development";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment,
  release: `website@${process.env.GIT_SHA}`,
  // the following is taken from: https://docs.sentry.io/platforms/javascript/#decluttering-sentry
  // and has been slightly adapted for our specific use cases
  ignoreErrors: [
    // Random plugins/extensions
    "top.GLOBALS",
    // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
    "originalCreateNotification",
    "canvas.contentDocument",
    "MyApp_RemoveAllHighlights",
    "http://tt.epicplay.com",
    "Can't find variable: ZiteReader",
    "jigsaw is not defined",
    "ComboSearch is not defined",
    "http://loading.retry.widdit.com/",
    "atomicFindClose",
    // Facebook borked
    "fb_xd_fragment",
    // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
    // reduce this. (thanks @acdha)
    // See http://stackoverflow.com/questions/4113268
    "bmi_SafeAddOnload",
    "EBCallBackMessageReceived",
    // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
    "conduitPage",
  ],
  denyUrls: [
    // Facebook flakiness
    /graph\.facebook\.com/i,
    // Facebook blocked
    /connect\.facebook\.net\/en_US\/all\.js/i,
    /connect\.facebook\.net\/en_US\/iab\.autofill\.payment\.js/i,
    // Woopra flakiness
    /eatdifferent\.com\.woopra-ns\.com/i,
    /static\.woopra\.com\/js\/woopra\.js/i,
    // Chrome extensions
    /extensions\//i,
    /^chrome:\/\//i,
    /chrome-extension:\//i,
    // Other plugins
    /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
    /webappstoolbarba\.texthelp\.com\//i,
    /metrics\.itunes\.apple\.com\.edgesuite\.net\//i,
    // ignore all errors originating from the attentive script
    /https:\/\/cdn\.attn\.tv/i,
    // ignore all errors originating from the klaviyo script
    /https:\/\/fast\.a\.klaviyo\.com/i,
    /https:\/\/static\.klaviyo\.com/i,
    // ignore all errors originating from the double click script
    /https:\/\/stats\.g\.doubleclick\.net/i,
  ],
});

// @TODO - fill in any user context that may be useful.
// This can be used to identifying the user by email or username, etc.
const userContext = {};

Sentry.setUser(userContext);

export default class Report {
  public static captureException(
    error: string | Error | null,
    options?: {},
    callback?: (scope: Sentry.Scope) => void
  ) {
    // Send error and context to Sentry
    Sentry.withScope((scope) => {
      /**
       * Let the users of `captureException` access other scope related features
       * Such as `scope.clear()` or `scope.setLevel("info")`
       * Note: This callback executes prior to the call to `captureException`.
       */
      if (callback) {
        callback(scope);
      }

      if (options) {
        scope.setExtras(options);
      }
      Sentry.captureException(error);
    });
  }

  public static setContext(context: {}) {
    Sentry.setUser(context);
  }

  /** Remove globally configured data */
  public static resetContext() {
    Sentry.configureScope((scope) => scope.clear());
  }
}
