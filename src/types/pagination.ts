export interface PaginationQueries {
  take?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface PaginationMeta {
  page: number;
  take: number;
  total: number;
}

export interface PageableResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  take: number;
  total: number;
  totalPages: number;
}

export interface PageableResponse<T> {
  status: string;
  message: string;
  data: T[];
  meta: PaginationMeta;
}

export interface GetEventsQuery extends PaginationQueries {
  userId?: string | number;
}

export interface GetAttendeeListQuery extends PaginationQueries {
  eventId?: number;
  search?: string;
}
