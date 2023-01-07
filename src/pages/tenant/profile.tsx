import { Box, Grid, Paper, Tabs } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconKey, IconUser } from '@tabler/icons';
import React from 'react';

import { FormEditMe } from '../../common/components/forms/FormEditMe';
import { FormEditMePassword } from '../../common/components/forms/FormEditMePassword';
import { Tenant } from '../../common/components/templates/Tenant';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Profile: NextPageWithLayout = () => {
  const handleSuccess = (message: string) => {
    showNotification({
      color: 'green',
      icon: <IconCheck size={14} />,
      message,
      title: 'Success',
    });
  };

  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Profile']} title="Profile" />
      </Box>

      <Box mb="xl" mt="xl">
        <Paper p="xl" shadow="md">
          <Tabs defaultValue="profile">
            <Tabs.List>
              <Tabs.Tab icon={<IconUser />} value="profile">
                Profile
              </Tabs.Tab>
              <Tabs.Tab icon={<IconKey />} value="changePassword">
                Change Password
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="profile">
              <Grid mt="xl">
                <Grid.Col lg={5} md={5} sm={12}>
                  <FormEditMe onSuccess={handleSuccess} />
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            <Tabs.Panel value="changePassword">
              <Grid mt="xl">
                <Grid.Col lg={5} md={5} sm={12}>
                  <FormEditMePassword onSuccess={handleSuccess} />
                </Grid.Col>
              </Grid>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Box>
    </>
  );
};

Profile.getLayout = (page: React.ReactElement) => <Tenant>{page}</Tenant>;

export default Profile;
