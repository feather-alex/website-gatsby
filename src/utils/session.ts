import { v4 } from 'uuid';

export default class Session {
  public static SESSION_KEY = 'sessionId';

  public static init() {
    if (!this.get()) {
      window.sessionStorage.setItem(this.SESSION_KEY, v4());
    }
  }

  public static get() {
    return window.sessionStorage.getItem(this.SESSION_KEY);
  }
}
