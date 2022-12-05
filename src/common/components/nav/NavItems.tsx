import { createStyles, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TablerIcon } from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  items: { href: string; icon: TablerIcon; label: string }[];
};

export const NavItems: React.FC<Props> = ({ items }) => {
  const { pathname } = useRouter();
  const [isCollapsed] = useDisclosure(false);
  const { classes, cx } = useStyles({ isCollapsed });

  return (
    <>
      {items.map(({ href, label, icon: Icon }) => {
        const splitPath = href.split('/');
        const getUpTo2ndPath =
          splitPath.length > 3
            ? [splitPath[0], splitPath[1], splitPath[2]].join('/')
            : splitPath.join('/');
        const isSamePath = pathname.startsWith(getUpTo2ndPath);

        return (
          <Tooltip
            withArrow
            disabled={!isCollapsed}
            key={label}
            label={label}
            position="right"
            sx={(theme) => ({
              marginBottom: theme.spacing.xs,
              width: '100%',
            })}
          >
            <Link
              className={cx(classes.link, {
                [classes.linkActive]: isSamePath,
              })}
              href={href}
            >
              <Icon className={classes.linkIcon} />
              <span className={classes.linkLabel}>{label}</span>
            </Link>
          </Tooltip>
        );
      })}
    </>
  );
};

const useStyles = createStyles(
  (theme, params: { isCollapsed?: boolean }, getRef) => {
    const icon: string = getRef('icon');

    return {
      link: {
        ...theme.fn.focusStyles(),
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,.1)',
          color: theme.white,

          [`& .${icon}`]: {
            color: theme.white,
          },
        },
        alignItems: 'center',
        borderRadius: theme.radius.sm,
        color: theme.colors.gray[6],
        columnGap: theme.spacing.sm,
        display: 'flex',
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
        marginBottom: 4,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        textDecoration: 'none',
        width: '100%',
      },

      linkActive: {
        '&, &:hover': {
          backgroundColor: theme.colors[theme.primaryColor][5],
          color: theme.white,
          [`& .${icon}`]: {
            color: theme.white,
          },
        },
      },

      linkIcon: {
        color: theme.colors.gray[6],
        ref: icon,
      },

      linkLabel: params?.isCollapsed ? { display: 'none' } : {},
    };
  }
);
