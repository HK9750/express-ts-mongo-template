import { Document, PopulateOptions } from 'mongoose'

export interface IPaginationMeta {
  total: number
  page: number
  limit: number
  pages: number
}

export interface IPaginationResult<T extends Document> {
  data: T[]
  pagination: IPaginationMeta
}

export interface IRequestedUser {
  sub: string
  role: string
  email: string
}

export interface GetPaginationQueryParams {
  model?: any
  query?: Record<string, any>
  page?: number
  limit?: number
  select?: string
  sort?: Record<string, 1 | -1>
  populate?: PopulateOptions | PopulateOptions[]
}

export interface GetAggregatedPaginationQueryParams {
  model?: any
  query: Record<string, any>[]
  page?: number
  limit?: number
}


export type MulterFilesMap = { [fieldname: string]: Express.Multer.File[] };