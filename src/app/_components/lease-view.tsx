import React from "react";
import {
  createColumnHelper,
  Column,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RouterOutputs } from "~/trpc/shared";

type Leases = RouterOutputs["lease"]["getAll"];

const columnHelper = createColumnHelper<any>();

export const LeaseView = (props: { leaseData: Leases }) => {
  if (!props.leaseData || props.leaseData.length === 0) {
    return <div>No lease data found...</div>;
  }

  const data = props.leaseData;
  const keys = Object.keys(data[0]);

  const columns: Column[] = keys.map((key) => {
    const columnDef = columnHelper.accessor(key, {
      id: key,
      header: key,
    });

    return columnDef;
  });

  // const table = useReactTable({
  //   data,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  // });

  return (
    <div className="p-2">
      {/* <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th colSpan={header.colSpan} key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};
