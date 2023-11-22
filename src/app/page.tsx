import BuildingDisplay from "./_components/building-display";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white bg-gradient-to-b">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Wampus<span className="text-[hsl(30,100%,60%)]">.fyi</span>
        </h1>
        <div>Landing content</div>
      </div>
      <div>
        <BuildingDisplay />
      </div>
    </main>
  );
}
