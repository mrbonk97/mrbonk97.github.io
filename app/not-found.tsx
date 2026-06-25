import { Footer } from "@/components/nav/footer";
import { Topnav } from "@/components/nav/top-nav";
import { Annoyed } from "lucide-react";

function NotFound() {
  return (
    <>
      <Topnav />
      <main className="p-4 md:p-8 mx-auto max-w-7xl">
        <header className="md:min-h-[calc(100vh-500px)] mt-12 md:mt-8">
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
