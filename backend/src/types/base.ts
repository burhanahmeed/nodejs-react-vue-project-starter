export interface IFindOptions {
  limit?: number;
  offset?: number;
  filters?: {[k: string]: any}
  sort?: string[][]
}