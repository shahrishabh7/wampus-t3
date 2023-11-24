import { RouterOutputs } from "~/trpc/shared";

type Leases = RouterOutputs["lease"]["getAll"];

export const calculateAverageRent = (leases: Leases): number => {
  const totalRent = leases.reduce((sum, lease) => sum + lease.rent, 0);
  const averageRent = totalRent / leases.length;
  return averageRent;
};

export const calculateSatisfactionRating = (leases: Leases): number => {
  const totalSatisfaction = leases.reduce(
    (sum, lease) => sum + lease.satisfaction_rating,
    0,
  );
  const averageSatisfaction = totalSatisfaction / leases.length;
  return averageSatisfaction;
};
