export default interface IFetchData {
  patch: string
  params?: {
    [key: string]: string | number | boolean
  }
  body?: string // JSON string
}
