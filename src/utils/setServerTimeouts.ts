import { Server } from "http";

/**
 * In order to prevent 502 errors on AWS ALB, you need to follow this formula
 * headersTimeout > keepAliveTimeout > ALB Default Timeout
 * https://github.com/nodejs/node/issues/27363
 *
 * One second is added to `keepAliveTimeout` to derive `headersTimeout`.
 * By default, the timeout is set to 65 secs to correspond to ALB's default of
 * 60 secs.
 *
 * @param server An instance of the HTTP Server
 * @param timeout Time in milliseconds to keep the connection alive
 */
export default function setServerTimeouts(server: Server, timeout = 65000) {
  server.keepAliveTimeout = timeout;
  server.headersTimeout = timeout + 1000;
}
