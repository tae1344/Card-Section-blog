import queryString from 'query-string';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import HttpError from '@http/HttpError';

export default class AxiosClient {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      timeout: 15000,
    });
  }

  private async requestAPI(method: any, path: string, params: any = null, body: any = {}): Promise<any> {
    const url = AxiosClient.appendParams(path, params);
    const headers = {
      ...(await this.createHeaders()),
      'Content-Type': 'application/json',
    };

    return this.apiClient
      .request({
        method: method,
        url: url,
        data: instanceToPlain(body),
        headers: headers,
      })
      .then((r: AxiosResponse) => r.data)
      .catch((e: AxiosError) => {
        console.error(e);
        return Promise.reject(new HttpError(e));
      });
  }

  private async createHeaders() {
    return {
      // Authorization: await AxiosClient.getAccessToken(),
      // 'Banlife-App-Version': Constants.manifest.version,
      // 'Banlife-Mobile-OS': Platform.OS.toUpperCase(),
      // 'Banlife-Mobile-OS-Version': Device.osVersion,
      // 'Banlife-Mobile-Model': Device.modelName,
    };
  }

  private static appendParams(path: string, params: any = null) {
    return params !== null ? `${path}?${queryString.stringify(params).toString()}` : path;
  }

  public async post<T>(
    path: string,
    params: any = null,
    body: any = null,
    clazz: { new () } | null = null
  ): Promise<T | null> {
    return this.requestAPI('POST', path, params, body).then((response) => {
      return clazz !== null ? plainToInstance(clazz, response) : null;
    });
  }

  public async get<T>(path: string, params: any = null, clazz: { new () }): Promise<T> {
    return this.requestAPI('GET', path, params).then((response) => {
      return plainToInstance(clazz, response);
    });
  }

  public async patch<T>(
    path: string,
    params: any = null,
    body: any = null,
    clazz: { new () } | null = null
  ): Promise<T | null> {
    return this.requestAPI('PATCH', path, params, body).then((response) => {
      return clazz !== null ? plainToInstance(clazz, response, { excludeExtraneousValues: true }) : null;
    });
  }

  public async delete(path: string) {
    return this.requestAPI('DELETE', path);
  }
}
