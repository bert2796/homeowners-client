import React from 'react';

import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  return context;
};
