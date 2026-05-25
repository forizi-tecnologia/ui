import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { API_TIMEOUT } from './types';

export interface ApiConfig {
  baseURL?: string;
  timeout?: number;
}

const defaultConfig: ApiConfig = {
  baseURL: '/api',
  timeout: API_TIMEOUT,
};

let currentConfig = { ...defaultConfig };

const api = axios.create({
  baseURL: currentConfig.baseURL,
  timeout: currentConfig.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function configureApi(config: Partial<ApiConfig>) {
  currentConfig = { ...currentConfig, ...config };

  if (config.baseURL) api.defaults.baseURL = config.baseURL;

  if (config.timeout) api.defaults.timeout = config.timeout;
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error),
);

export default api;
