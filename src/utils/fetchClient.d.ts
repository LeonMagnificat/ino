export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export interface FetchResponse<T = any> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export interface FetchClient {
  get: <T>(url: string, options?: FetchOptions) => Promise<FetchResponse<T>>;
  post: <T>(url: string, data?: any, options?: FetchOptions) => Promise<FetchResponse<T>>;
  put: <T>(url: string, data?: any, options?: FetchOptions) => Promise<FetchResponse<T>>;
  delete: <T>(url: string, options?: FetchOptions) => Promise<FetchResponse<T>>;
}

declare const fetchClient: FetchClient;
export default fetchClient; 