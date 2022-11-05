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
};

const initialValue: AuthContextProps = {
  login: undefined,
  token: '',
  user: undefined,
};

export const AuthContext = React.createContext(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<Data.User | undefined>(undefined);
  const [cookies, setCookie] = useCookies(['token']);

  React.useEffect(() => {
    const loadUserFromCookies = async () => {
      if (cookies.token) {
        // set headers auth
        setHeadersAuth(cookies.token);

        // retrieve user details
        const { data } = await userAPI.getMe();

        // set user
        setUser(data);
      }
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

  return (
    <AuthContext.Provider value={{ login, token: cookies.token, user }}>
      {children}
    </AuthContext.Provider>
  );
};
