import React from "react";
import {
  createColumnHelper,
  Column,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RouterOutputs } from "~/trpc/shared";
import TremorCard from "./tremor-card";
import { calculateAverage } from "~/utils/building-stats";

type Leases = RouterOutputs["lease"]["getAll"];

export const LeaseView = (props: { leaseData: Leases }) => {
  if (!props.leaseData || props.leaseData.length === 0) {
    return <div>No lease data found...</div>;
  }

  const data = props.leaseData;
  const averageRent = calculateAverage(data.map((lease) => lease.rent));
  const satisfactionRating = calculateAverage(
    data.map((lease) => lease.satisfaction_rating),
  );

  return (
    <div className="flex p-2">
      <TremorCard
        title={"Average Rent"}
        value={`$ ${averageRent.toFixed(2)}`}
      ></TremorCard>
      <TremorCard
        title={"Average Satisfaction Rating"}
        value={satisfactionRating.toFixed(1)}
      ></TremorCard>
      <TremorCard title={"asdf"} value={"asdf"}></TremorCard>
    </div>
  );
};
