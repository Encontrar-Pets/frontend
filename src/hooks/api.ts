import React from "react";
import { Method, ResponseType, AxiosResponse, AxiosInstance } from "axios";
import MSApi, { MSApiTypes } from "services/msApi";

const types: { [type: string]: string[] } = {
  coreServer: ["coreServer"],
};

const apis: { [type: string]: any } = {
  coreServer: MSApi,
};

export interface UseServiceOptions<Params = any> {
  params?: Params;
  headers?: Record<string, string>;
  responseType?: ResponseType;
  loading?: boolean;
  noError?: boolean;
}

export interface DynamicUseServiceOptions<Params = any> {
  dynamicRoutes?: string;
  dynamicParams?: Params;
  dynamicHeaders?: Record<string, string>;
  dynamicResponseType?: ResponseType;
}

const useApi = <Response = any, Params = any>(
  apiType: MSApiTypes,
  type: Method,
  route: string,
  {
    params,
    headers,
    responseType,
    loading = true,
    noError = false,
  }: UseServiceOptions<Params>
) => {
  const [data, setData] = React.useState<AxiosResponse<Response>>();
  const apiName = Object.keys(types).find((item) =>
    types[item].includes(apiType)
  ) as string;
  const API = apis[apiName];
  const api: AxiosInstance = API.getApi(apiType);

  api.defaults.withCredentials = true;

  const fetchData = async ({
    dynamicRoutes,
    dynamicParams,
    dynamicHeaders,
    dynamicResponseType,
  }: DynamicUseServiceOptions<Params>): Promise<Response> => {
    const methodParams = ["get", "options", "head", "delete"].includes(
      type.toLowerCase()
    )
      ? { params: dynamicParams ? dynamicParams : params }
      : { data: dynamicParams ? dynamicParams : params };

    if (loading) {
      // Loading.show();
    }

    try {
      const response = await api.request<Response>({
        method: type,
        url: dynamicRoutes ? dynamicRoutes : route,
        headers: {
          ...dynamicHeaders,
          ...headers,
        },
        responseType: dynamicResponseType ? dynamicResponseType : responseType,
        ...methodParams,
      });

      setData(response);
      if (loading) {
        // Loading.hide();
      }

      return response.data;
    } catch (error) {
      if (loading) {
        // Loading.hide();
      }
      if (!noError) {
        console.log(error);
      }
      throw error;
    }
  };

  return { response: data, fetch: fetchData };
};

export default useApi;
