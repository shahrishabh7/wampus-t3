import Link from "next/link";
import { api } from "~/trpc/server";
import Image from "next/image";
import { Building } from "@prisma/client";
import { RouterOutputs } from "~/trpc/shared";

type BuildingWithImage = RouterOutputs["building"]["getAll"][number];

export const Card = (props: { buildingData: BuildingWithImage }) => {
  if (!props.buildingData) {
    return <div>No building data found...</div>;
  }

  return (
    <div className="h-96">
      {" "}
      {/* Set a fixed height for the card */}
      <Link href={`/building/${props.buildingData.building.id}`}>
        <div className="h-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
          <a href="#">
            <div className="relative h-3/5 overflow-hidden">
              {" "}
              {/* Set a fixed height for the image container */}
              <Image
                className="h-full w-full rounded-t-lg object-cover" // Use object-cover to ensure the image covers the entire container
                src={props.buildingData.image.imagePath ?? "/placeholder.png"}
                alt={props.buildingData.building.name}
                layout="fill" // Use layout="fill" to make the image fill its container
              />
            </div>
          </a>
          <div className="flex h-2/5 flex-col justify-between p-5">
            {" "}
            {/* Set a fixed height for the content container */}
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {props.buildingData.building.name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {props.buildingData.building.address}
            </p>
            <a
              href="#"
              className="inline-flex items-center rounded-lg bg-orange-400 px-3 py-2 text-center text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
};
