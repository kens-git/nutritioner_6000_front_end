import React from 'react'
import { useState } from 'react'

export interface AuthContextData {
  token: string;
  isLoggedIn: boolean;
  login(token: string): void;
  logout(): void;
}

const AuthContext =
  React.createContext<AuthContextData>({
    token: '',
    isLoggedIn: false,
    login: (token: string) => {},
    logout: () => {}
  });

export const AuthContextProvider:
    React.FC<{children: React.ReactNode}> = (props) => {
  const [token, setToken] = useState<string>(
    (() => {
      const token = sessionStorage.getItem('token');
      if(token) {
        return token;
      }
      return ''
    })()
  );

  const isLoggedIn = !!token;

  const onLogin = (token: string) => {
    setToken(token);
    sessionStorage.setItem('token', token);
  }

  const onLogout = () => {
    setToken('');
    sessionStorage.removeItem('token');
  }

  const contextValue: AuthContextData = {
    token: token,
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
