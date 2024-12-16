import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
} from 'axios';
import qs from 'qs';

class HTTPClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      paramsSerializer: {
        serialize: params => {
          return qs.stringify(params, {arrayFormat: 'repeat'});
        },
      },
      timeout: 15000,
    });
    this.axiosInstance.interceptors.request.use(async (request: any) => {
      return request;
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        return Promise.reject(error.response);
      },
    );
  }

  async post<T, R>(
    path: string,
    data: T,
    options: AxiosRequestConfig = {},
  ): Promise<R> {
    return this.axiosInstance.post(path, data, options);
  }

  async put<T, R>(
    path: string,
    data: T,
    options: AxiosRequestConfig = {},
  ): Promise<R> {
    return this.axiosInstance.put(path, data, options);
  }

  async get<P, R>(
    path: string,
    params?: P,
    responseType?: ResponseType,
  ): Promise<R> {
    return this.axiosInstance.get(path, {
      params,
      responseType: responseType,
    });
  }

  async delete<P, R>(path: string, params?: P): Promise<R> {
    return this.axiosInstance.delete(path, {params});
  }
}

const httpClient = new HTTPClient('http://todoapp.tryasp.net');

export default httpClient;
