import { Hero } from "@/components";
import dynamic from "next/dynamic";

const Sections = dynamic(() => import("./sections"));

export default function Home() {
  return (
    <main className="bg-black">
      {/* Background */}
      <div className="bg-background bg-no-repeat bg-cover bg-center fixed top-0 left-0 w-screen h-screen" />

      <div className="relative">
        <Hero />
        <Sections />
      </div>
    </main>
  );
}
