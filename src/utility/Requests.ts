import axios, { AxiosError } from "axios";

/**
 * Performs a GET request on the application's host.
 * 
 * @param path The path of the API endpoint.
 * @param token The current user's authentication token.
 * @param params Optional query parameters.
 * @returns The response.
 */
export const GET = <T>(path: string, token: string, query_params?: any) => {
  return axios.get<T>(
      `${process.env.REACT_APP_HOST}api/${path}/`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      },
      params: query_params ? query_params! : undefined
    })
    .catch((error: Error | AxiosError) => { /* TODO */  });
};

/**
 * Performs a POST request on the application's host.
 * 
 * @param path The path of the API endpoint.
 * @param data The data to submit.
 * @param token The current user's authentication token.
 * @returns The response.
 */
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
