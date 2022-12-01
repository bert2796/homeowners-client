import { Button, createStyles, Title } from '@mantine/core';
import { IconZoomQuestion, TablerIcon } from '@tabler/icons';
import React from 'react';

type Props = {
  icon?: TablerIcon;
  title: string;
  onCreate?: () => void;
};

export const EmptyItems: React.FC<Props> = ({
  icon: Icon,
  title,
  onCreate,
}) => {
  const { classes, theme } = useStyles();

  const renderIcon = () => {
    if (Icon) {
      return <Icon color={theme.colors.gray[5]} size={120} />;
    }

    return <IconZoomQuestion color={theme.colors.gray[5]} size={120} />;
  };

  return (
    <>
      <div className={classes.notificationWrapper}>
        {renderIcon()}

        <Title className={classes.notificationTitle} mb="lg" order={2}>
          {title}
        </Title>

        {onCreate && (
          <Button mt="xl" size="lg" onClick={onCreate}>
            Create Now
          </Button>
        )}
      </div>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  notification: {
    backgroundColor: theme.colors.gray[1],
  },
  notificationTitle: {
    color: theme.colors.gray[7],
    marginTop: 20,
  },
  notificationWrapper: {
    marginBottom: 50,
    marginTop: 50,
    textAlign: 'center',
  },
}));
