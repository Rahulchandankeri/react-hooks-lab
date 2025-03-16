export interface IResponse {
  response: null | object;
  status: number;
}

export interface IError {
  status: number;
  message: string;
}
export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
export interface IUseFetch {
  url: string;
  payload?: object;
  options: RequestInit;
}

export interface IUseFetchReturn {
  loading: boolean;
  error: IError;
  response: IResponse;
  refetch: () => void;
}
