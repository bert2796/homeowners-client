import { Box, createStyles, Image } from '@mantine/core';
import type { NextPage } from 'next';

import { LoginForm } from '../../common/components/forms/LoginForm';
import { withNonAuth } from '../../common/components/hoc/withNonAuth';
import bg from '../../common/resources/images/bg.jpeg';
import stiLogo from '../../common/resources/images/sti-logo.png';
const Login: NextPage = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Box sx={{ width: 450 }}>
          <Image alt="STI" height="20" mb="xl" src={stiLogo.src} width="100" />
          <LoginForm />
        </Box>
      </div>
    </div>
  );
};

export default withNonAuth(Login);

const useStyles = createStyles(() => ({
  root: {
    // backgroundImage: `url(${bg.src})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: '100% 100%',
    minHeight: '100vh',
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    minHeight: '100vh',
  },
}));
