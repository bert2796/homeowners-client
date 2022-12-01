import { Center, Container, Title } from '@mantine/core';
import type { NextPage } from 'next';
import Image from 'next/image';

import { LoginForm } from '../../common/components/forms/LoginForm';
import { withNonAuth } from '../../common/components/hoc/withNonAuth';

const Login: NextPage = () => {
  return (
    <Container my={100} size={520}>
      <Center mb="xl">
        {/* <Image alt="logo" height="150" src="/logo.svg" width="250" /> */}
        <Title>Sta. Barbara Villas 1</Title>
      </Center>
      <LoginForm />
    </Container>
  );
};

export default withNonAuth(Login);
