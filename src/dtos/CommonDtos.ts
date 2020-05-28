export type PageInfo = { pageNumber: number, pageSize: number, totalPages: number }
export type Page<T> = { items: T[], pageInfo: PageInfo }
export type ValidationError = { field: string, code: string }