import axios, { AxiosError } from "axios";

export const GET = <T>(path: string, token: string) => {
  return axios.get<T>(
      `${process.env.REACT_APP_HOST}api/${path}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .catch((error: Error | AxiosError) => {
      console.log(error);
      if(axios.isAxiosError(error)) {
        // error.config,
        // error.request
        // error.response
      } else {
        // 'stock' error, containing ????
      }
    });
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
    .catch((error: Error | AxiosError) => {
      console.log(error);
      if(axios.isAxiosError(error)) {
        // error.config,
        // error.request
        // error.response
      } else {
        // 'stock' error, containing ????
      }
    });
}
