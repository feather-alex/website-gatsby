import Logger from "../utils/logger";
import Session from "../utils/session";

declare global {
  interface Window {
    analytics: SegmentAnalytics.AnalyticsJS;
    tatari: {
      track(eventType: string, params: object): void;
      identify(id: string | number): void;
    };
  }
}

class Analytics {
  static isTrackerLoaded = (): boolean => {
    const isLoaded = typeof window.analytics !== "undefined";

    return isLoaded;
  };

  static trackPage = (pageName: string) => {
    if (!Analytics.isTrackerLoaded()) {
      return;
    }

    window.analytics.page(pageName, undefined, { session_id: Session.get() });
  };

  static trackEvent = (
    eventName: string,
    props?: object,
    segmentOptions?: object
  ) => {
    if (!Analytics.isTrackerLoaded()) {
      return;
    }

    const properties: object = {
      ...props,
      session_id: Session.get(),
    };

    window.analytics.track(eventName, properties, segmentOptions);
  };

  static trackUser = (params: { userId?: string; properties?: object }) => {
    const { userId, properties } = params;

    if (!Analytics.isTrackerLoaded()) {
      return;
    }

    if (typeof userId !== "string" && typeof properties !== "object") {
      Logger.log(
        `Cannot track user information without a user ID or properties/traits`
      );
    }

    if (typeof userId === "string") {
      window.analytics.identify(userId, {
        ...properties,
        session_id: Session.get(),
      });
    } else {
      window.analytics.identify({ ...properties, session_id: Session.get() });
    }
  };
  static tatariEvent = (eventType = "purchase", params: object) => {
    if (window.tatari) {
      if (process.env.REACT_APP_FEATHER_ENV === "production") {
        window.tatari.track(eventType, params);
      } else {
        window.tatari.track("testPurchase", params);
      }
    }
  };
  static tatariIdentify = (id: number) => {
    if (window.tatari && process.env.REACT_APP_FEATHER_ENV === "production") {
      window.tatari.identify(id);
    }
  };
}

export default Analytics;
