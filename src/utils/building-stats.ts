export const calculateAverage = (values: number[]): number => {
  const totalRent = values.reduce((sum, value) => sum + value, 0);
  const averageRent = totalRent / values.length;
  return averageRent;
};
