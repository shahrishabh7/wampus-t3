import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { PageLayout } from "../_components/layout";
import { LoadingPage } from "../_components/loading";
import { api } from "~/trpc/server";

const BuildingPage: NextPage<{ buildingId: string }> = async ({
  buildingId,
}) => {
  const data = await api.lease.getByBuildingId.query({
    buildingId: buildingId,
  });
  console.log(data);

  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title></title>
      </Head>
      <PageLayout>
        <div className="relative h-36 bg-slate-600"></div>
        <div className="h-[64px]"></div>
        <div className="w-full border-b border-slate-400"></div>
      </PageLayout>
    </>
  );
};

export default BuildingPage;
