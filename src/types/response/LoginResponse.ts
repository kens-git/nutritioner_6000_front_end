/** Defines the response of a login request. */
interface LoginResponse {

  /** The current user's authentication token. */
  token: string;

  /** The current user's id. */
  user_id: number;
}

export default LoginResponse;
