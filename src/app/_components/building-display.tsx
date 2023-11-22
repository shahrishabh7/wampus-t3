import Link from "next/link";
import { api } from "~/trpc/server";

export default async function BuildingDisplay() {
  const data = await api.building.getAll.query();
  console.log("data", data);

  return (
    <div>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        Building display
      </div>
      {data.map((building) => (
        <div key={building.id}>
          <Link href={`/building/${building.id}`}>{building.name}</Link>
        </div>
      ))}
    </div>
  );
}
