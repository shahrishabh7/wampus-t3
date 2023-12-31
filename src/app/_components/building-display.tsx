import { api } from "~/trpc/server";
import { BuildingCard } from "./building-card";

export default async function BuildingDisplay() {
  const data = await api.building.getAll.query();

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1 className="font-extrabold tracking-tight text-gray-900 sm:text-[3rem]">
        Buildings
      </h1>
      <div className="grid grid-cols-1 gap-4 shadow-md md:grid-cols-2 lg:grid-cols-3">
        {data.map((buildingData) => (
          <div key={buildingData.building.id}>
            <BuildingCard buildingData={buildingData}></BuildingCard>
          </div>
        ))}
      </div>
    </div>
  );
}
