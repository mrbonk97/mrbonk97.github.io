import { Footer } from "@/components/footer";
import { Topnav } from "@/components/topnav";
import { Annoyed } from "lucide-react";

function NotFound() {
  return (
    <>
      <Topnav />
      <main className="p-4 mx-auto max-w-5xl">
        <header className="mt-14 md:mt-24">
          <h1 className="text-center text-6xl font-bold leading-normal">
            404
            <br /> Not Found
          </h1>
          <Annoyed size={64} className="mt-8 mb-32 mx-auto" />
        </header>
      </main>
      <Footer />
    </>
  );
}

export default NotFound;
