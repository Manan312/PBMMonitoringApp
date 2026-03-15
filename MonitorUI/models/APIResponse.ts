export interface APIResponse<T> {
  Status: string;
  Data: T;
  Errors: APIErrorResponse[];
}

export interface APIErrorResponse {
  Code: string;
  Message: string;
}
