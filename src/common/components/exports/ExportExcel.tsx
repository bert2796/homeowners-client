import { Button } from '@mantine/core';
import { IconFileAnalytics } from '@tabler/icons';
import FileSaver from 'file-saver';
import React from 'react';
import XLSX from 'sheetjs-style';

type Props = {
  reports: Data.Report[];
  fileName: string;
};

export const ExportExcel: React.FC<Props> = ({ reports, fileName }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const exportToExcel = () => {
    setIsLoading(true);

    const ws = XLSX.utils.json_to_sheet(reports);
    const wb = { SheetNames: ['data'], Sheets: { data: ws } };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(data, `${fileName}.xlsx`);

    setIsLoading(false);
  };

  return (
    <Button
      color="teal"
      leftIcon={<IconFileAnalytics size={14} />}
      loading={isLoading}
      onClick={exportToExcel}
    >
      Export to Excel
    </Button>
  );
};
