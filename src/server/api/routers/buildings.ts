import { Building } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const fs = require("fs");

const addImagesToBuildings = async (buildings: Building[]) => {
  const publicDirectoryPath = "./public";
  const buildingImages = fs.readdirSync(publicDirectoryPath);

  return buildings.map((building) => {
    const normalizedBuildingName = building.name
      .toLowerCase()
      .replace(/\s+/g, ""); // Make lowercase and remove spaces
    const imageName = `${normalizedBuildingName}.jpg`;

    if (buildingImages.includes(imageName)) {
      const imagePath = `/${imageName}`;

      return {
        building,
        image: {
          imagePath,
        },
      };
    } else {
      return {
        building,
        image: {
          imagePath: "./placeholder.png",
        },
      };
    }
  });
};

export const buildingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const buildings = await ctx.db.building.findMany({
      take: 100
    });
    return addImagesToBuildings(buildings);
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const building = await ctx.db.building.findFirst({
        where: {
          building_id: input.id,
        },
        take: 100,
      });
      const buildingArray = building ? [building] : [];
      return addImagesToBuildings(buildingArray);
    }),
});
