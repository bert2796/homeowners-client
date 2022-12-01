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
      <Image alt="logo" height="48" src="/logo-light.svg" width="150" />
    </Link>
  );
};

const useStyles = createStyles((theme) => ({
  logo: {
    cursor: 'pointer',
    display: 'flex',
    flexGrow: 0,
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    position: 'relative',
  },
}));
