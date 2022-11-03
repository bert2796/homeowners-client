import { Container } from '@mantine/core';
import type { NextPage } from 'next';

import { LoginForm } from '../../common/components/forms/LoginForm';

const Login: NextPage = () => {
  return (
    <Container my={40} size={420}>
      <LoginForm />
    </Container>
  );
};

export default Login;
