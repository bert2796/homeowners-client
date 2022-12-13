import { Box } from '@mantine/core';
import React from 'react';

import { ModalFacility } from '../../common/components/modals/ModalFacility';
import { TableFacilities } from '../../common/components/tables/TableFacilities';
import { Tenant } from '../../common/components/templates/Tenant';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Facilities: NextPageWithLayout = () => {
  const [type, setType] = React.useState<Data.Action>('Create');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [facilityId, setFacilityId] = React.useState(0);

  const handleOnAction = (type: Data.Action, id?: number) => {
    if (id) {
      setFacilityId(id);
    }

    setType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Facilities']} title="Facilities" />
      </Box>

      {/* Facilities */}
      <Box mb="xl" mt="xl">
        <TableFacilities onView={(id: number) => handleOnAction('View', id)} />
      </Box>

      {/* Modals */}
      <ModalFacility
        id={facilityId}
        isOpen={isModalOpen}
        type={type}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

Facilities.getLayout = (page: React.ReactElement) => <Tenant>{page}</Tenant>;

export default Facilities;
