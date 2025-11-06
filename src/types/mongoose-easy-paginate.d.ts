declare module 'mongoose-easy-paginate' {
  interface PaginateOptions<T> {
    model: any
    query?: Record<string, any>
    page?: number
    limit?: number
    select?: string
    sort?: Record<string, 1 | -1>
    populate?: any
  }

  interface AggregatePaginateOptions<T> {
    model: any
    query: Record<string, any>[]
    page?: number
    limit?: number
  }

  export function getPaginatedData<T>(options: PaginateOptions<T>): Promise<{ data: T[]; pagination: any }>
  export function getAggregatedPaginatedData<T>(options: AggregatePaginateOptions<T>): Promise<{ data: T[]; pagination: any }>
}
