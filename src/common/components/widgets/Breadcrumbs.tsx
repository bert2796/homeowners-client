import { Breadcrumbs as MantineBreadCrumbs, Text } from '@mantine/core';
import React from 'react';

type Props = {
  items: string[];
  title: string;
};

export const Breadcrumbs: React.FC<Props> = ({ items, title }) => (
  <>
    <Text fw={700} fz="lg">
      {title}
    </Text>
    <MantineBreadCrumbs separator={<Text c="gray">-</Text>}>
      {items.map((text) => (
        <Text c="gray" fz="sm" key={text}>
          {text}
        </Text>
      ))}
    </MantineBreadCrumbs>
  </>
);
