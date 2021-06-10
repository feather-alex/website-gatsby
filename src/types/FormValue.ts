export default interface FormValue<T> {
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: T | any;
  error: string | null;
  touched: boolean;
}
