import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const buildingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const buildings = await ctx.db.building.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });
    return buildings;
  }),
});
