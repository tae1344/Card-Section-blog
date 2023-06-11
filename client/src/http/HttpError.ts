import { AxiosError } from 'axios'

export default class HttpError {
  public readonly code: string
  public readonly message: string | null

  constructor(e: AxiosError<any, unknown>) {
    this.code = e.response?.status.toString() ?? '500'
    this.message = e.response?.data.message ?? '무언가 문제가 발생했습니다. :<'
  }
}
