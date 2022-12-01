import { createStyles, Loader as MantineLoader, Paper } from '@mantine/core';
import React from 'react';

export const Loader: React.FC = () => {
  const { classes } = useStyles();

  return (
    <>
      <Paper withBorder className={classes.paper} shadow="xs">
        <div className={classes.loader}>
          <MantineLoader mt="xl" />
        </div>
      </Paper>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  loader: {
    textAlign: 'center',
  },
  paper: {
    backgroundColor: theme.colors.gray[1],
    paddingBottom: 70,
    paddingTop: 70,
  },
}));
