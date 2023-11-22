import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { slug: string } }) {
  const leases = await api.lease.getByBuildingId.query({
    buildingId: params.slug,
  });
  const building = await api.building.getById.query({ id: params.slug });
  console.log("building", building);
  if (!building) {
    return <div>Building not found</div>;
  }

  return (
    <div>
      <h1>Building: {building.name}</h1>
      <ul>
        {leases.map((lease) => (
          <li key={lease.id}>{lease.name}</li>
        ))}
      </ul>
    </div>
  );
}
