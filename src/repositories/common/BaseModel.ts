import {
  ClientSession,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
  UpdateQuery,
  QueryWithHelpers,
  UpdateResult,
  Document,
  Model,
  Schema,
  model
} from 'mongoose'
import { getAggregatedPaginatedData, getPaginatedData } from 'mongoose-easy-paginate'
import {
  GetAggregatedPaginationQueryParams,
  GetPaginationQueryParams,
  IPaginationResult
} from '../../utils/interfaces'

export default class BaseModel<T extends Document> {
  private model!: Model<T>

  constructor (name: string, schema: Schema) {
    this.initializeModel(name, schema)
  }

  private initializeModel (name: string, schema: Schema): void {
    const model = this.compileModel(name, schema)
    this.setModel(model)
  }

  private compileModel (name: string, schema: Schema): Model<T> {
    return model<T>(name, schema)
  }

  private setModel (model: Model<T>): void {
    this.model = model
  }

  // Getter to expose the Mongoose model
  getModel (): Model<T> {
    return this.model
  }

  // Create a document
  create (obj: Record<string, any>, options?: { session?: ClientSession }): Promise<T> {
    return this.model.create([obj], options).then(docs => docs[0])
  }

  // Get a document by query
  get (filter: RootFilterQuery<T> = {} as RootFilterQuery<T>, projection?: ProjectionType<T>, options?: QueryOptions<T>): QueryWithHelpers<T | null, T> {
    return this.model.findOne(filter, projection, options)
  }

  findAll (filter: RootFilterQuery<T> = {} as RootFilterQuery<T>, projection?: ProjectionType<T> | null, options?: QueryOptions<T>): QueryWithHelpers<T[], T> {
    return this.model.find(filter, projection, options)
  }

  countDocuments (filter: RootFilterQuery<T> = {} as RootFilterQuery<T>): Promise<number> {
    return this.model.countDocuments(filter).exec()
  }

  // Get all documents with pagination
  async getAll ({ query, page, limit, select, sort, populate }: GetPaginationQueryParams): Promise<IPaginationResult<T>> {
    const { data, pagination } = await getPaginatedData({
      model: this.model as any,
      query,
      page,
      limit,
      populate,
      select,
      sort
    })

    return { data: data as T[], pagination }
  }

  // Get all documents with aggregation and pagination
  async getAllAggregate ({ query, page, limit }: GetAggregatedPaginationQueryParams): Promise<IPaginationResult<T>> {
    const { data, pagination } = await getAggregatedPaginatedData({
      model: this.model as any,
      query,
      page,
      limit
    })

    return { data: data as T[], pagination }
  }

  upsert (filter: RootFilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions<T>) {
    return this.model.findOneAndUpdate(filter, update, { ...options, upsert: true, new: true, lean: true })
  }

  // Update a document
  update (filter: RootFilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions<T>): QueryWithHelpers<T | null, T> {
    return this.model.findOneAndUpdate(filter, update, options || { new: true })
  }

  updateMany (filter: RootFilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions<T>): Promise<UpdateResult> {
    return this.model.updateMany(filter, update, options) as Promise<UpdateResult>
  }

  // Delete a document by query
  delete (filter: RootFilterQuery<T>): QueryWithHelpers<T | null, T> {
    return this.model.findOneAndDelete(filter)
  }
}
