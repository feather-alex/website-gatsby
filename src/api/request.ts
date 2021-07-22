import Cookies from "js-cookie";
import {
  APIError,
  isAPIError,
  StripeError,
  isStripeError,
  isTooManyAttemptsError,
} from "./error";

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum SortDirection {
  ASC = "a",
  DESC = "d",
}

export interface QueryParam {
  name: string;
  value: string | string[];
}

export default class Request {
  private static basePath: string = process.env.REACT_APP_BASE_PATH || "";

  public static async send<T extends object | string>(
    method: RequestMethod,
    path: string,
    queryParams?: QueryParam[],
    body?: T,
    isPlainText?: boolean
  ) {
    const queryString = this.getQueryString(queryParams);
    const fullPath = `${this.basePath}${path}`;
    const endpoint = `${fullPath}${queryString}`;

    const fetchOptions: RequestInit = {
      method,
      headers: this.getDefaultHeaders(method),
    };

    if (method !== RequestMethod.GET) {
      fetchOptions.body = JSON.stringify(body);
    }

    return fetch(endpoint, fetchOptions).then((response) => {
      return this.handleResponseData(response, isPlainText || false);
    });
  }

  private static getQueryString(queryParams?: QueryParam[]): string {
    let queryString = "";

    if (queryParams && queryParams.length > 0) {
      for (const queryParam of queryParams) {
        queryString +=
          (queryString.length ? "&" : "?") +
          `${queryParam.name}=${queryParam.value}`;
      }
    }

    return queryString;
  }

  private static getDefaultHeaders(method: RequestMethod): Headers {
    const defaultHeaders: Headers = new Headers();
    const token = Cookies.get("token");

    if (method !== RequestMethod.GET) {
      defaultHeaders.set("Content-Type", "application/json; charset=utf-8");
    }
    if (token) {
      defaultHeaders.set("Authorization", `Bearer ${token}`);
    }
    return defaultHeaders;
  }

  private static handleResponseData(response: Response, isPlainText: boolean) {
    if (!response.text) {
      throw new APIError("The request data is invalid.", "Bad Request", 0);
    }

    switch (response.status) {
      case 200:
      case 201:
        return response.text().then((text) => {
          if (!text) {
            return;
          }
          return isPlainText ? text : JSON.parse(text);
        });

      // BAD REQUEST
      case 400:
        if (!response.json) {
          throw new APIError(
            "The request data is invalid.",
            "Bad Request",
            response.status
          );
        }
        return response.json().then((error) => {
          throw new APIError(
            "The request data is invalid.",
            "Bad Request",
            response.status,
            error
          );
        });

      // UNAUTHORIZED
      case 401:
        throw new APIError(
          "Access is denied due to invalid credentials.",
          "Unauthorized",
          response.status
        );

      // FORBIDDEN
      case 403:
        throw new APIError(
          "You don't have enough permission to view this.",
          "Forbidden",
          response.status
        );

      // NOT FOUND
      case 404:
        throw new APIError(
          "Yikes! We're sorry, but this page either couldn't be found or no longer exists.",
          "Not Found",
          response.status
        );

      case 500: {
        if (!response.json) {
          throw new APIError(
            "There is something wrong with the server at the moment.",
            "Internal Server Error",
            response.status
          );
        }
        return response.json().then((jsonObject) => {
          if (isStripeError(jsonObject)) {
            throw new StripeError(
              jsonObject.message,
              response.status,
              jsonObject.code
            );
          } else if (isTooManyAttemptsError(jsonObject)) {
            const error = JSON.parse(jsonObject.error);
            throw new APIError(
              error.error_description,
              error.error,
              response.status
            );
          } else {
            throw new APIError(
              "There is something wrong with the server at the moment.",
              "Internal Server Error",
              response.status
            );
          }
        });
      }
      default:
        if (!response.json) {
          throw new APIError();
        }

        return response.json().then((error) => {
          if (!isAPIError(error)) {
            throw new APIError();
          }

          throw new APIError(
            error.message || error.detail,
            error.error,
            error.status
          );
        });
    }
  }
}
