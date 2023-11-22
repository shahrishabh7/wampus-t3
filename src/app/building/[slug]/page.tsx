import { BuildingHeader } from "~/app/_components/building-header";
import { PageLayout } from "~/app/_components/layout";
import { api } from "~/trpc/server";

export default async function Page({ params }: { params: { slug: string } }) {
  const leases = await api.lease.getByBuildingId.query({
    buildingId: params.slug,
  });
  const building = await api.building.getById.query({ id: params.slug });
  if (!building || !building[0]) {
    return <div>Building not found</div>;
  }

  return (
    <div>
      <PageLayout>
        <BuildingHeader buildingData={building[0]}></BuildingHeader>
        <ul>
          {leases.map((lease) => (
            <li key={lease.id}>{lease.name}</li>
          ))}
        </ul>
      </PageLayout>
    </div>
  );
}
