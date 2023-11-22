import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "../_components/layout";

const BuildingPage: NextPage<{ buildingId: string }> = ({ buildingId }) => {
  console.log(buildingId);
  return (
    <>
      <Head>
        <title>hello</title>
      </Head>
      <PageLayout>
        <div className="relative h-36 bg-slate-600"></div>
        <div className="h-[64px]"></div>
        <div className="w-full border-b border-slate-400"></div>
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;

  if (typeof slug !== "string") {
    throw new Error("No slug");
  }

  return {
    props: {
      slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default BuildingPage;
