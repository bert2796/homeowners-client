import Router from 'next/router';
import React from 'react';
import { useCookies } from 'react-cookie';

import { authAPI, userAPI } from '../services';
import { setHeadersAuth } from '../utils';

type Props = {
  children?: React.ReactNode;
};

type AuthContextProps = {
  token: string;
  user: Data.User | undefined;
  isInitialized: boolean;
  login?: (params: { username: string; password: string }) => Promise<void>;
  logout?: () => void;
};

const initialValue: AuthContextProps = {
  isInitialized: false,
  login: undefined,
  logout: undefined,
  token: '',
  user: undefined,
};

export const AuthContext = React.createContext(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<Data.User | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInit, setIsInit] = React.useState(false);
  const [cookies, setCookie] = useCookies(['token']);

  React.useEffect(() => {
    const loadUserFromCookies = async () => {
      setIsLoading(true);

      if (cookies.token) {
        try {
          // set headers auth
          setHeadersAuth(cookies.token);

          // retrieve user details
          const { data } = await userAPI.getMe();

          // set user
          setUser(data);
        } catch (error) {
          logout();
        }
      }

      setIsLoading(false);
      setIsInit(true);
    };

    loadUserFromCookies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.token]);

  const login = async (params: { username: string; password: string }) => {
    try {
      const { data } = await authAPI.login(params);
      if (data?.accessToken) {
        setCookie('token', data.accessToken);

        // set headers auth
        setHeadersAuth(cookies.token);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setCookie('token', '');

    // set headers auth
    setHeadersAuth('');

    // set user to undefined/ empty to redirect to login
    setUser(undefined);

    Router.push('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isInitialized: isInit,
        login,
        logout,
        token: cookies.token,
        user,
      }}
    >
      {isInit && !isLoading && children}
    </AuthContext.Provider>
  );
};
