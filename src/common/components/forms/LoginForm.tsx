import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

export const LoginForm = () => {
  return (
    <div>
      <Paper withBorder p={35} radius="md" shadow="md">
        <Box>
          <Title
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Login
          </Title>
          <Text>Lorem Ipsum is simply dummy text</Text>
        </Box>

        <Box mt="xl">
          <TextInput
            required
            label="Username or Email"
            placeholder="you@mantine.dev"
          />
          <PasswordInput
            required
            label="Password"
            mt="lg"
            placeholder="Your password"
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
          <Button fullWidth mt="xl">
            Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
};
