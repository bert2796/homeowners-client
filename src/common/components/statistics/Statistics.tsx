import { createStyles, Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';

type Props = {
  items: { title: string; value: string; icon: TablerIcon }[];
};

export const Statistics: React.FC<Props> = ({ items }) => {
  const { classes } = useStyles();

  return (
    <>
      <SimpleGrid
        breakpoints={[
          { cols: 2, maxWidth: 'md' },
          { cols: 1, maxWidth: 'xs' },
        ]}
        cols={items.length}
      >
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Paper withBorder key={item.title} p="md" radius="md" shadow="sm">
              <Group position="apart">
                <Text className={classes.title} size="md">
                  {item.title}
                </Text>
                <Icon className={classes.icon} size={22} stroke={1.5} />
              </Group>

              <Group align="flex-end" mt={25} spacing="xs">
                <Text className={classes.value}>{item.value}</Text>
              </Group>
            </Paper>
          );
        })}
      </SimpleGrid>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },
}));
