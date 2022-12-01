const amountWithCommaRegex = /\B(?=(\d{3})+(?!\d))/g;
const amountPHPCheckerRegex = /\PHP\s?|(,*)/g;

export const convertToPHPAmount = (amount?: string) => {
  if (amount && !Number.isNaN(parseFloat(amount))) {
    return `PHP ${amount}`.replace(amountWithCommaRegex, ',');
  }

  return 'PHP ';
};

export const amountParser = (value?: string) =>
  value ? value.replace(amountPHPCheckerRegex, '') : '';

export const objectKeyRemover = (
  obj: object,
  additionalKeysToRemove: string[]
) => {
  const keysToRemove = [
    'id',
    'updatedAt',
    'createdAt',
    'deletedAt',
    ...(additionalKeysToRemove || []),
  ];
  const newObj = Object.entries(obj)
    .sort()
    .reduce((newObject, [key, value]) => {
      if (!keysToRemove.includes(key)) {
        newObject[key] = value;
      }

      return newObject;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as unknown as any);

  return newObj;
};

export const hasDataChanges = (
  obj1: object,
  obj2: object,
  additionalKeysToRemove?: string[]
) => {
  const newObj1 = objectKeyRemover(obj1, additionalKeysToRemove || []);
  const newObj2 = objectKeyRemover(obj2, additionalKeysToRemove || []);
  const res = JSON.stringify(newObj1) !== JSON.stringify(newObj2);

  return res;
};

export const generatePassword = () => {
  const length = 8;
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let retVal = '';

  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }

  return retVal;
};
