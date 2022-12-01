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
  login?: (params: { username: string; password: string }) => Promise<void>;
  logout?: () => void;
};

const initialValue: AuthContextProps = {
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
        // set headers auth
        setHeadersAuth(cookies.token);

        // retrieve user details
        const { data } = await userAPI.getMe();

        // set user
        setUser(data);
      }

      setIsLoading(false);
      setIsInit(true);
    };

    loadUserFromCookies();
  }, [cookies.token]);

  const login = async (params: { username: string; password: string }) => {
    const { data } = await authAPI.login(params);
    if (data?.accessToken) {
      setCookie('token', data.accessToken);

      // set headers auth
      setHeadersAuth(cookies.token);
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
    <AuthContext.Provider value={{ login, logout, token: cookies.token, user }}>
      {isInit && !isLoading && children}
    </AuthContext.Provider>
  );
};
