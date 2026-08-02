export interface LoveLineResponse {
  id: string
  text: string
  datasetVersion: string
}

export interface ApiErrorResponse {
  error: {
    code: string
    message: string
  }
}
