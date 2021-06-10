export interface PagedResponse<T> {
  total: number | null;
  pageData: T[];
}
