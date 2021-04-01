/* eslint no-console: off, @typescript-eslint/no-empty-function: off */

const consoleMethods = ['log', 'info', 'warn', 'error'];

const Logger: { [method: string]: Function } = {};

consoleMethods.forEach((method) => {
  if (process.env.NODE_ENV === 'production') {
    Logger[method] = () => {};
  } else {
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger[method] = (...args: any[]) => console[method](...args);
  }
});

export default Logger;
