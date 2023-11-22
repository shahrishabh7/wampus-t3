import { buildingsRouter } from "~/server/api/routers/buildings";
import { createTRPCRouter } from "~/server/api/trpc";
import { leasesRouter } from "./routers/leases";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  building: buildingsRouter,
  lease: leasesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
