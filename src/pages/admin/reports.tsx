import { Box, Grid, Paper, Text } from '@mantine/core';
import React from 'react';

import { FormGenerateReport } from '../../common/components/forms/FormGenerateReport';
import { TableReports } from '../../common/components/tables/TableReports';
import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { reportAPI } from '../../common/services/index';
import { NextPageWithLayout } from '../_app';

const Reports: NextPageWithLayout = () => {
  const [period, setPeriod] = React.useState<
    'weekly' | 'monthly' | 'yearly' | undefined
  >(undefined);
  const [reportType, setReportType] = React.useState<
    | 'lease-payments'
    | 'utility-charges'
    | 'extra-charges'
    | 'reservation-payments'
    | undefined
  >(undefined);
  const [reports, setReports] = React.useState<Data.Report[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGenerateReport = async (
    type:
      | 'lease-payments'
      | 'utility-charges'
      | 'extra-charges'
      | 'reservation-payments',
    periodToSet: 'weekly' | 'monthly' | 'yearly',
    id?: number
  ) => {
    setPeriod(periodToSet);
    setReportType(type);
    setIsLoading(true);

    try {
      let data: Data.Report[] = [];

      if (type === 'lease-payments') {
        ({ data } = await reportAPI.getLeasePaymentsReport(periodToSet));
      } else if (type === 'utility-charges' && id) {
        ({ data } = await reportAPI.getUtilityChargesReport(id, periodToSet));
      } else if (type === 'extra-charges' && id) {
        ({ data } = await reportAPI.getExtraChargesReport(id, periodToSet));
      } else if (type === 'reservation-payments') {
        ({ data } = await reportAPI.getReservationPaymentsReport(periodToSet));
      }

      setReports(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Reports']} title="Reports" />
      </Box>

      {/* Reports */}
      <Box mb="xl" mt="xl">
        <Grid h={700}>
          <Grid.Col lg={3} md={3} sm={12} xs={12}>
            <Paper p="md" pt="xs" shadow="sm">
              <Text fz="xl">Generate Report</Text>

              <FormGenerateReport
                isReportLoading={isLoading}
                onSubmit={handleGenerateReport}
              />
            </Paper>
          </Grid.Col>
          {period && reportType && (
            <Grid.Col lg={9} md={9} sm={12} xs={12}>
              <TableReports
                period={period}
                reports={reports || []}
                type={reportType}
              />
            </Grid.Col>
          )}
        </Grid>
      </Box>
    </>
  );
};

Reports.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default Reports;
