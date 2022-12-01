import { createStyles } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  link: string;
};

export const NavHeader: React.FC<Props> = ({ link }) => {
  const { classes } = useStyles();

  return (
    <Link className={classes.logo} href={link}>
      Sta. Barbara Villas 1
    </Link>
  );
};

const useStyles = createStyles((theme) => ({
  logo: {
    color: theme.white,
    cursor: 'pointer',
    display: 'flex',
    flexGrow: 0,
    fontSize: 24,
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    position: 'relative',
  },
}));
