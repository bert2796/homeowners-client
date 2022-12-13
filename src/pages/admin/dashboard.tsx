import { Box } from '@mantine/core';
import {
  IconBuildingWarehouse,
  IconCash,
  IconHome,
  IconUserSearch,
} from '@tabler/icons';
import React from 'react';

import { Statistics } from '../../common/components/statistics/Statistics';
import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import {
  useGetFacilities,
  useGetPayments,
  useGetProperties,
  useGetTenants,
} from '../../common/hooks/api';
import { NextPageWithLayout } from '../_app';

const Dashboard: NextPageWithLayout = () => {
  const { data: getFacilities, isLoading: isGetFacilitiesLoading } =
    useGetFacilities();
  const { data: getProperties, isLoading: isGetPropertiesLoading } =
    useGetProperties();
  const { data: getTenants, isLoading: isGetTenantsLoading } = useGetTenants();
  const { data: getPayments, isLoading: isGetPaymentsLoading } =
    useGetPayments();

  const isLoading = React.useMemo(
    () =>
      isGetFacilitiesLoading ||
      isGetPropertiesLoading ||
      isGetTenantsLoading ||
      isGetPaymentsLoading,
    [
      isGetFacilitiesLoading,
      isGetPropertiesLoading,
      isGetTenantsLoading,
      isGetPaymentsLoading,
    ]
  );

  const statisticItems = React.useMemo(() => {
    return [
      {
        icon: IconBuildingWarehouse,
        title: 'Total Facilities',
        value: `${getFacilities?.data.length}` || '0',
      },
      {
        icon: IconHome,
        title: 'Total Properties',
        value: `${getProperties?.data.length}` || '0',
      },
      {
        icon: IconUserSearch,
        title: 'Total Tenants',
        value: `${getTenants?.data.length}` || '0',
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
    ];
  }, [
    getFacilities?.data.length,
    getPayments?.data,
    getProperties?.data.length,
    getTenants?.data.length,
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

Dashboard.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default Dashboard;
