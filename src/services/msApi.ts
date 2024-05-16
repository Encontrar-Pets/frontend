import axios, { AxiosInstance } from "axios";

export type MSApiTypes = "coreServer";

const API_HOSTS = {
  coreServer: process.env.REACT_APP_CORE_BASE_URL,
} as { [key: string]: string };

let instances = {} as { [key: string]: AxiosInstance };

const CreateApi = {
  getApi: (type: MSApiTypes) => {
    if (!instances[type]) {
      for (const host in API_HOSTS) {
        instances[host] = axios.create({ baseURL: API_HOSTS[host] });
      }
    }

    return instances[type];
  },

  setHeader: (headers: { [key: string]: string }, type?: MSApiTypes) => {
    const applyHeaders = (instance: AxiosInstance) => {
      for (const header in headers) {
        instance.defaults.headers.common[header] = headers[header];
      }
    };

    if (type) {
      if (!instances[type]) {
        CreateApi.getApi(type);
      }
      return applyHeaders(instances[type]);
    }

    for (const type in API_HOSTS) {
      if (!instances[type]) {
        CreateApi.getApi(type as MSApiTypes);
      }
      applyHeaders(instances[type]);
    }
  },
};

export default CreateApi;
