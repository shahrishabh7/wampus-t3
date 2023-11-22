import { Building } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const leasesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const leases = await ctx.db.lease.findMany({
      take: 100,
    });
    return leases;
  }),
  getByBuildingId: publicProcedure
    .input(
      z.object({
        buildingId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) =>
      ctx.db.lease.findMany({
        where: {
          building_id: input.buildingId,
        },
        take: 100,
      }),
    ),
});
