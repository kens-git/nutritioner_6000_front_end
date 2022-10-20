import React from 'react'
import { useState } from 'react'

/** Defines the AuthContext's data. */
export interface AuthContextData {

  /** The current user's authentication token. */
  token: string | null;

  /** The current user's id. */
  user_id: string | null;

  /** Returns true if the user is logged in. */
  isLoggedIn(): boolean;

  /**
   * Stores the current user's authentication
   * 
   * @param user_id The id of the current user.
   * @param token The current user's authentication token.
   */
  login(user_id: string, token: string): void;
  
  /**
   * Erases the current user's authentication token and id,
   * logging them out.
   */
  logout(): void;
}

/** Defines a context for handling user sessions. */
const AuthContext =
  React.createContext<AuthContextData>({
    token: null,
    user_id: null,
    isLoggedIn: () => { return false; },
    login: (user_id: string, token: string) => {},
    logout: () => {}
  });

/** Defines the AuthContext's data type. */
interface LoginData {

  /** The current user's authentication token. */
  token: string | null;

  /** The current user's id. */
  user_id: string | null;
}

/** Provider for the AuthContext. */
export const AuthContextProvider:
    React.FC<{children: React.ReactNode}> = (props) => {
  const [loginData, setLoginData] = useState<LoginData>(
    ((): LoginData => {
      return {
        token: sessionStorage.getItem('token'),
        user_id: sessionStorage.getItem('user_id')
      }
    })());

  const isLoggedIn = () => {
    return loginData.token !== null &&
      loginData.user_id !== null;
  }

  const onLogin = (user_id: string, token: string) => {
    setLoginData({
      token: token,
      user_id: user_id
    });
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user_id', user_id);
  }

  const onLogout = () => {
    setLoginData({
      token: null,
      user_id: null
    });
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user_id');
  }

  const contextValue: AuthContextData = {
    token: loginData.token,
    user_id: loginData.user_id,
    isLoggedIn: isLoggedIn,
    login: onLogin,
    logout: onLogout
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
