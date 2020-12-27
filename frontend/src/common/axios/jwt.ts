import { AxiosInstance, AxiosResponse } from 'axios';
import { User } from 'common/types/auth';

type ClosureState = {
  token: string | null;
  refreshToken: string | null;
  refreshRequest: Promise<AxiosResponse<User>> | null;
};

export const addJwtInterceptors = (client: AxiosInstance) => {
  const STATE: ClosureState = {
    token: null,
    refreshToken: null,
    refreshRequest: null,
  };
  // Add auth header on request
  client.interceptors.request.use(
    (config) => {
      STATE.token = localStorage.getItem('token');
      STATE.refreshToken = localStorage.getItem('refreshToken');

      if (!STATE.token) {
        return config;
      }

      const headers = {
        ...config.headers,
        Authorization: `Bearer ${STATE.token}`,
      };

      const updatedConfig = {
        ...config,
        headers,
      };

      return updatedConfig;
    },
    (err) => Promise.reject(err)
  );
  // Try update token if error
  client.interceptors.response.use(
    (r) => r,
    async (err) => {
      const hasRetry = err.config.retry;
      const { status } = err.response;

      if (!STATE.refreshToken || status !== 403 || hasRetry) {
        return Promise.reject(err);
      }

      if (!STATE.refreshRequest) {
        STATE.refreshRequest = client.post<User>('/jwt-auth/whoami', {
          refreshToken: STATE.refreshToken,
        });
      }

      const { data } = await STATE.refreshRequest;
      const { token } = data;
      const { refreshToken } = data;

      STATE.refreshRequest = null;
      STATE.token = localStorage.getItem('token');
      STATE.refreshToken = localStorage.getItem('refreshToken');

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      const updatedConfig = {
        ...err.config,
        retry: true,
      };

      return client(updatedConfig);
    }
  );

  return client;
};
