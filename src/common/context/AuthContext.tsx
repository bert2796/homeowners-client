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
  updateCurrentUser?: (data: Partial<Data.User>) => void;
};

const initialValue: AuthContextProps = {
  isInitialized: false,
  login: undefined,
  logout: undefined,
  token: '',
  updateCurrentUser: undefined,
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

  const updateUser = (params: Partial<Data.User>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedUser: any = {};

    if (user) {
      Object.entries(user).forEach(([key, value]) => {
        if (
          params[`${key as keyof Data.User}`] &&
          params[`${key as keyof Data.User}`] !== value
        ) {
          updatedUser[
            `${key}` as keyof Pick<
              Data.User,
              'firstName' | 'middleName' | 'lastName' | 'username' | 'email'
            >
          ] = params[`${key as keyof Data.User}`] as string;
        }
      });
    }

    if (updatedUser) {
      setUser({
        ...user,
        ...(updatedUser as Data.User),
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isInitialized: isInit,
        login,
        logout,
        token: cookies.token,
        updateCurrentUser: updateUser,
        user,
      }}
    >
      {isInit && !isLoading && children}
    </AuthContext.Provider>
  );
};
