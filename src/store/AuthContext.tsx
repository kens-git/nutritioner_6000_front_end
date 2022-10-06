import React from 'react'
import { useState } from 'react'

export interface AuthContextData {
  token: string | null;
  user_id: string | null;
  isLoggedIn(): boolean;
  login(user_id: string, token: string): void;
  logout(): void;
}

const AuthContext =
  React.createContext<AuthContextData>({
    token: null,
    user_id: null,
    isLoggedIn: () => { return false; },
    login: (user_id: string, token: string) => {},
    logout: () => {}
  });

interface LoginData {
  token: string | null;
  user_id: string | null;
}

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
