import { ApisauceInstance, create } from "apisauce";

import { ApiConfig, IAutStore, TRequestMethod } from "../common/types";
import { DEFAULT_API_CONFIG } from "../common/constants/http/api-config";

export class Api {
  apisauce: ApisauceInstance;
  config: ApiConfig;
  authStore?: IAutStore;

  constructor({ config = DEFAULT_API_CONFIG }: { config?: ApiConfig }) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
    this.authHeaders();
  }

  setAuthStore = (authStore: IAutStore) => {
    this.authStore = authStore;
  };

  authHeaders = () => {
    this.apisauce.addRequestTransform(request => {
      if (this.authStore) {
        request.headers = {
          Authorization: `Bearer ${this.authStore.authToken}`,
        };
      }
    });
  };

  makeRequest = async <T, K = Record<string, unknown>>({
    urlPath,
    params,
    body,
    headers,
    method = "get",
    data,
  }: {
    urlPath: string;
    params?: Record<string, string | number>;
    body?: K;
    headers?: ApisauceInstance["headers"];
    method?: TRequestMethod;
    data?: Record<string, string | number>;
  }) => {
    const secondArgument =
      method === "get" || method === "delete" ? params : body;
    try {
      return await this.apisauce[method]<T>(urlPath, secondArgument, {
        headers,
        data,
      });
    } catch (e) {
      this.handleError(e as Error);
    }
  };

  private handleError(error: Error): never {
    throw error;
  }
}
