import Link from "next/link";
import { api } from "~/trpc/server";
import Image from "next/image";
import { Card } from "./building-card";

export default async function BuildingDisplay() {
  const data = await api.building.getAll.query();
  console.log("data", data);

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
      <h1>Building Display</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.map((buildingData) => (
          <div key={buildingData.building.id}>
            <Card buildingData={buildingData}></Card>
          </div>
        ))}
      </div>
    </div>
  );
}
