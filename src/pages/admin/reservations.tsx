/* eslint-disable simple-import-sort/imports */
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { Box } from '@mantine/core';
import React from 'react';

import { withAuth } from '../../common/components/hoc/withAuth';
import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Reservations: NextPageWithLayout = () => {
  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Reservations']} title="Reservations" />
      </Box>

      {/* Calendar */}
      <Box bg="#fff" mb="xl" mt="xl" p="md">
        <FullCalendar initialView="dayGridMonth" plugins={[dayGridPlugin]} />
      </Box>
    </>
  );
};

Reservations.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default withAuth(Reservations);
