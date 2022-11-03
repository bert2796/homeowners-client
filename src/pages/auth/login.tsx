import { Center, Container } from '@mantine/core';
import type { NextPage } from 'next';
import Image from 'next/image';

import { LoginForm } from '../../common/components/forms/LoginForm';

const Login: NextPage = () => {
  return (
    <Container my={100} size={520}>
      <Center>
        <Image alt="logo" height="150" src="/logo.svg" width="250" />
      </Center>
      <LoginForm />
    </Container>
  );
};

export default Login;
