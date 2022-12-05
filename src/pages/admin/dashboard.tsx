import { Box } from '@mantine/core';
import React from 'react';

import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Dashboard: NextPageWithLayout = () => {
  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Dashboard']} title="Dashboard" />
      </Box>
    </>
  );
};

Dashboard.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default Dashboard;
