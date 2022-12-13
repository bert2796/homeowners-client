import { Box } from '@mantine/core';
import {
  IconBuildingWarehouse,
  IconCalendarEvent,
  IconCash,
  IconNews,
} from '@tabler/icons';
import React from 'react';

import { Statistics } from '../../common/components/statistics/Statistics';
import { Tenant } from '../../common/components/templates/Tenant';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { useAuth } from '../../common/hooks';
import {
  useGetAnnouncements,
  useGetFacilities,
  useGetPayments,
} from '../../common/hooks/api';
import { NextPageWithLayout } from '../_app';

const Dashboard: NextPageWithLayout = () => {
  const { user } = useAuth();
  const { data: getAnnouncements, isLoading: isGetAnnouncementsLoading } =
    useGetAnnouncements();
  const { data: getFacilities, isLoading: isGetFacilitiesLoading } =
    useGetFacilities();
  const { data: getPayments, isLoading: isGetPaymentsLoading } = useGetPayments(
    user?.id
  );

  const isLoading = React.useMemo(
    () =>
      isGetFacilitiesLoading ||
      isGetPaymentsLoading ||
      isGetAnnouncementsLoading,
    [isGetFacilitiesLoading, isGetPaymentsLoading, isGetAnnouncementsLoading]
  );

  const statisticItems = React.useMemo(() => {
    return [
      {
        icon: IconBuildingWarehouse,
        title: 'Total Facilities',
        value: `${getFacilities?.data.length}` || '0',
      },
      {
        icon: IconCash,
        title: 'Pending Payments',
        value:
          `${
            getPayments?.data?.filter((payment) => payment.status === 'Pending')
              ?.length
          }` || '0',
      },
      {
        icon: IconCalendarEvent,
        title: 'Upcoming Reservations',
        value: '0',
      },
      {
        icon: IconNews,
        title: 'Total Announcements',
        value: `${getAnnouncements?.data.length}` || '0',
      },
    ];
  }, [
    getAnnouncements?.data.length,
    getFacilities?.data.length,
    getPayments?.data,
  ]);

  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Dashboard']} title="Dashboard" />
      </Box>

      {/* statistics */}
      <Box mt="md">
        {!isLoading && <Statistics items={statisticItems || []} />}
      </Box>
    </>
  );
};

Dashboard.getLayout = (page: React.ReactElement) => <Tenant>{page}</Tenant>;

export default Dashboard;
