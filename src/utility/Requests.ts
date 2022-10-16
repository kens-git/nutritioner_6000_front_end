import axios, { AxiosError } from "axios";

export const GET = <T>(path: string, token: string, params?: any) => {
  return axios.get<T>(
      `${process.env.REACT_APP_HOST}api/${path}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      params: params ? params! : undefined
    })
    .catch((error: Error | AxiosError) => { /* TODO */  });
};

export const POST = <T, Response>(
    path: string, data: T, token?: string) => {
  const config = token != null ? {
    headers: {
      'Authorization': `Token ${token!}`,
      'Content-Type': 'application/json'
    }
  } : {};
  return axios.post<Response>(
      `${process.env.REACT_APP_HOST}api/${path}/`,
      data, config)
    .catch((error: Error | AxiosError) => { /* TODO */ });
}
