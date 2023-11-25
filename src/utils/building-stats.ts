export const calculateAverage = (values: number[]): number => {
  const totalRent = values.reduce((sum, value) => sum + value, 0);
  const averageRent = totalRent / values.length;
  return averageRent;
};

export const calculateRangeWithOutliers = (
  values: number[],
): [number, number] | null => {
  const sortedValues = values.slice().sort((a, b) => a - b);
  const n = sortedValues.length;
  const q1 = sortedValues[Math.floor(n / 4)];
  const q3 = sortedValues[Math.floor((3 * n) / 4)];
  if (q1 === undefined || q3 === undefined) {
    return null;
  }

  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  const filteredValues = values.filter(
    (value) => value >= lowerBound && value <= upperBound,
  );

  if (filteredValues.length > 0) {
    const min = Math.min(...filteredValues);
    const max = Math.max(...filteredValues);
    return [min, max];
  } else {
    return null;
  }
};
