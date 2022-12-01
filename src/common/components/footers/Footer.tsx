import { Box, createStyles, Group, Text } from '@mantine/core';
import React from 'react';

export const Footer: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.footer} p="lg">
      <Group spacing="xs">
        <Text c="gray" fs="xs">
          2022©
        </Text>
        <Text fs="xs">Homeowners Association</Text>
      </Group>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  footer: {
    backgroundColor: theme.white,
    borderTop: `1px solid ${theme.colors.gray[2]}`,
    height: 60,
  },
}));
