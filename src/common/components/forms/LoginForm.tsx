import {
  Alert,
  Anchor,
  Box,
  Button,
  Checkbox,
  createStyles,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

import { useAuth } from '../../hooks';

export const LoginForm = () => {
  const auth = useAuth();
  const form = useForm<{ username: string; password: string }>({
    initialValues: {
      password: '',
      username: '',
    },
  });
  const { classes } = useStyles();
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const isLoginDisabled = Object.values(form.values).some((value) => !value);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!Object.keys(form.errors).length && auth.login) {
      setIsLoading(true);
      setError('');

      auth
        .login(form.values)
        .then(() => {
          console.log(auth.user);
        })
        .catch((error) => {
          console.log(error);
          setError(error?.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div>
      <Paper withBorder p={35} radius="md" shadow="md">
        <Box>
          <Title className={classes.login}>Login</Title>
          <Text>Welcome back!</Text>
        </Box>

        <Box mt="xl">
          {error && (
            <Alert
              color="red"
              mb={20}
              title="Encountered an error while logging in"
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleFormSubmit}>
            <TextInput
              required
              label="Username or Email"
              placeholder="you@mantine.dev"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              required
              label="Password"
              mt="lg"
              placeholder="Your password"
              {...form.getInputProps('password')}
            />
            <Group mt="lg" position="apart">
              <Checkbox label="Remember me" />
              <Anchor<'a'>
                href="#"
                size="sm"
                onClick={(event) => event.preventDefault()}
              >
                Forgot password?
              </Anchor>
            </Group>
            <Button
              fullWidth
              color="stiBlue"
              disabled={isLoginDisabled}
              loading={isLoading}
              mt="xl"
              size="md"
              type="submit"
            >
              Login
            </Button>
          </form>
        </Box>
      </Paper>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  login: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
  },
}));
