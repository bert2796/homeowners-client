import { createStyles, Image } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import logo from '../../resources/images/white-logo.png';

type Props = {
  link: string;
};

export const NavHeader: React.FC<Props> = ({ link }) => {
  const { classes } = useStyles();

  return (
    <Link className={classes.logo} href={link}>
      <Image
        alt="Sta. Barbara Villas 1"
        height={60}
        mr="sm"
        src={logo.src}
        width={60}
      />
      Sta. Barbara Villas 1
    </Link>
  );
};

const useStyles = createStyles((theme) => ({
  logo: {
    alignItems: 'center',
    color: theme.white,
    cursor: 'pointer',
    display: 'flex',
    flexGrow: 0,
    fontSize: 16,
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    position: 'relative',
    textDecoration: 'none',
  },
}));
