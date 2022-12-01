import { Box } from '@mantine/core';
import React from 'react';

import { withAuth } from '../../common/components/hoc/withAuth';
import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Facilities: NextPageWithLayout = () => {
  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Facilities']} title="Facilities" />
      </Box>
    </>
  );
};

Facilities.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default withAuth(Facilities);
