import { Shell } from "lucide-react";
import { Topnav } from "@/components/nav/top-nav";
import { Footer } from "@/components/nav/footer";

function NotFound() {
  return (
    <>
      <Topnav />
      <main className="p-4 py-20 mx-auto max-w-4xl min-h-full">
        <header className="mt-8">
          <h1 className="text-center text-6xl font-bold leading-normal text-rose-400">
            404
            <br /> Not Found
          </h1>
          <Shell size={64} className="mt-8 mx-auto text-rose-400" />
        </header>
      </main>
      <Footer />
    </>
  );
}

export default NotFound;
