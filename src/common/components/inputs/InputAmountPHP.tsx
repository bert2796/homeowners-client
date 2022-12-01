import { NumberInput, NumberInputProps } from '@mantine/core';

import { amountParser, convertToPHPAmount } from '../../utils';

export const InputAmountPHP: React.FC<NumberInputProps> = ({
  value,
  onChange,
  ...rest
}) => (
  <NumberInput
    formatter={convertToPHPAmount}
    label="Amount"
    min={1}
    parser={amountParser}
    value={value}
    onChange={onChange}
    {...rest}
  />
);
