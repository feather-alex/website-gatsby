import Request, { RequestMethod } from "./request";

describe("Request", () => {
  describe("send", () => {
    afterEach(() => {
      window.fetch = undefined as unknown as () => Promise<Response>;
    });

    describe("success", () => {
      const mockBody = JSON.stringify({ ok: "Ok" });
      const mockTextPromise = Promise.resolve(mockBody);
      const mockFetchPromise = Promise.resolve({
        status: 200,
        text: () => mockTextPromise,
        json: () => mockTextPromise,
      });

      beforeEach(() => {
        window.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
      });

      it("sends a GET request", async () => {
        const response = await Request.send(RequestMethod.GET, "/test");
        expect(response).toEqual(JSON.parse(mockBody));
        expect(window.fetch).toHaveBeenCalledWith("/test", {
          headers: new Headers(),
          method: "GET",
        });
      });

      it("sends a POST request", async () => {
        const response = await Request.send(
          RequestMethod.POST,
          "/test",
          undefined,
          "test"
        );
        expect(response).toEqual(JSON.parse(mockBody));
        expect(window.fetch).toHaveBeenCalledWith(
          "/test",
          expect.objectContaining({
            headers: new Headers(),
            method: "POST",
            body: JSON.stringify("test"),
          })
        );
      });

      it("sends a PUT request", async () => {
        const response = await Request.send(
          RequestMethod.PUT,
          "/test",
          undefined,
          "test"
        );
        expect(response).toEqual(JSON.parse(mockBody));
        expect(window.fetch).toHaveBeenCalledWith(
          "/test",
          expect.objectContaining({
            headers: new Headers(),
            method: "PUT",
            body: JSON.stringify("test"),
          })
        );
      });

      it("sends a DELETE request", async () => {
        const response = await Request.send(
          RequestMethod.DELETE,
          "/test",
          undefined,
          "test"
        );
        expect(response).toEqual(JSON.parse(mockBody));
        expect(window.fetch).toHaveBeenCalledWith(
          "/test",
          expect.objectContaining({
            headers: new Headers(),
            method: "DELETE",
            body: JSON.stringify("test"),
          })
        );
      });
    });

    describe("failure", () => {
      const mockFetch = (body: object | string, status: number) => {
        const mockBody = JSON.stringify(body);
        const mockTextPromise = Promise.resolve(mockBody);
        const mockJsonPromise = Promise.resolve(body);
        const mockFetchPromise = Promise.resolve({
          status,
          text: () => mockTextPromise,
          json: () => mockJsonPromise,
        });
        window.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
      };

      it("throws an APIError on status 400", async () => {
        const mockBody = "";
        mockFetch(mockBody, 400);

        await expect(
          Request.send(RequestMethod.POST, "/test", undefined, "test")
        ).rejects.toThrowError(
          expect.objectContaining({
            status: 400,
            error: "Bad Request",
          })
        );
      });

      it("throws an APIError on status 401", async () => {
        const mockBody = "{}";
        mockFetch(mockBody, 401);

        await expect(
          Request.send(RequestMethod.POST, "/test", undefined, "test")
        ).rejects.toThrowError(
          expect.objectContaining({
            status: 401,
            error: "Unauthorized",
          })
        );
      });

      it("throws an APIError on status 403", async () => {
        const mockBody = "{}";
        mockFetch(mockBody, 403);

        await expect(
          Request.send(RequestMethod.POST, "/test", undefined, "test")
        ).rejects.toThrowError(
          expect.objectContaining({
            status: 403,
            error: "Forbidden",
          })
        );
      });

      it("throws an APIError on status 404", async () => {
        const mockBody = "{}";
        mockFetch(mockBody, 404);

        await expect(
          Request.send(RequestMethod.POST, "/test", undefined, "test")
        ).rejects.toThrowError(
          expect.objectContaining({
            status: 404,
            error: "Not Found",
          })
        );
      });

      it("throws an APIError on status 500", async () => {
        const mockBody = {};
        mockFetch(mockBody, 500);

        await expect(
          Request.send(RequestMethod.POST, "/test", undefined, "test")
        ).rejects.toThrowError(
          expect.objectContaining({
            status: 500,
            error: "Internal Server Error",
          })
        );
      });

      it("throws a StripeError on status 500", async () => {
        const mockBody = {
          type: "StripeCardError",
          message: "stripe error",
          code: 1234,
        };
        mockFetch(mockBody, 500);

        await expect(
          Request.send(RequestMethod.POST, "/test", undefined, "test")
        ).rejects.toThrowError(
          expect.objectContaining({
            status: 500,
            code: 1234,
            message: "stripe error",
          })
        );
      });

      it("throws a Too many attempts error on status 500", async () => {
        const mockBody = {
          error: JSON.stringify({
            error: "too_many_attempts",
            error_description: "test description",
          }),
        };
        mockFetch(mockBody, 500);

        await expect(
          Request.send(RequestMethod.POST, "/test", undefined, "test")
        ).rejects.toThrowError(
          expect.objectContaining({
            status: 500,
            message: "test description",
            error: "too_many_attempts",
          })
        );
      });

      it("throws a generic APIError on unknown status", async () => {
        const mockBody = {};
        mockFetch(mockBody, 513);

        await expect(
          Request.send(RequestMethod.POST, "/test", undefined, "test")
        ).rejects.toThrowError(
          expect.objectContaining({
            status: 0,
            error: "Unknown Error",
          })
        );
      });
    });
  });
});
