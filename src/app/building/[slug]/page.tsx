import Link from "next/link";
import { BuildingHeader } from "~/app/_components/building-header";
import { PageLayout } from "~/app/_components/layout";
import { LeaseView } from "~/app/_components/lease-view";
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
        <div className="w-auto">
          <Link href={"/"}>
            <button className="m-4 rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100 ">
              Back
            </button>
          </Link>
        </div>
        <BuildingHeader buildingData={building[0]}></BuildingHeader>
        <LeaseView leaseData={leases}></LeaseView>
      </PageLayout>
    </div>
  );
}
