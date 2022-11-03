import React from 'react';

type Props = {
  children?: React.ReactNode;
};

type AuthContextProps = {
  token: string;
  user: Data.User | undefined;
};

const initialValue: AuthContextProps = {
  token: '',
  user: undefined,
};

export const AuthContext = React.createContext(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<Data.User | undefined>(undefined);
  const [token, setToken] = React.useState('');

  return (
    <AuthContext.Provider value={{ token, user }}>
      {children}
    </AuthContext.Provider>
  );
};
