import { Center, Container, createStyles } from '@mantine/core';
import type { NextPage } from 'next';
import Image from 'next/image';

import { LoginForm } from '../../common/components/forms/LoginForm';
import { withNonAuth } from '../../common/components/hoc/withNonAuth';
import bg from '../../common/resources/images/bg.jpg';
import logo from '../../common/resources/images/logo.jpg';

const Login: NextPage = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container my={20} size={520}>
        <Center mb="xl">
          <Image alt="logo" height="250" src={logo.src} width="250" />
          {/* <Title>Sta. Barbara Villas 1</Title> */}
        </Center>
        <LoginForm />
      </Container>
    </div>
  );
};

export default withNonAuth(Login);

const useStyles = createStyles(() => ({
  root: {
    backgroundImage: `url(${bg.src})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
  },
}));
