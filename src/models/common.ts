export interface PaginationParams {
  _limit: number;
  _page: number;
  _total: number;
}

// getList ➤ 1 format Obj 2 key {data,pagination}
export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}
