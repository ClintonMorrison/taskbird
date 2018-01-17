export interface QueryMeta {
  limit: number;
  offset: number;
  total_count: number
}

export interface ApiResponse {
  meta: QueryMeta;
  objects: Array<any>
}
