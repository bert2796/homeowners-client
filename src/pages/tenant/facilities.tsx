import { Box } from '@mantine/core';
import React from 'react';

import { Tenant } from '../../common/components/templates/Tenant';
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

Facilities.getLayout = (page: React.ReactElement) => <Tenant>{page}</Tenant>;

export default Facilities;
