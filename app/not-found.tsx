import Link from "next/link";

const NotFound = () => {
  return (
    <main className="p-4 mx-auto max-w-7xl">
      <h1 className="mt-16 text-7xl font-black text-center">404</h1>
      <h2 className="mt-2 text-lg font-medium text-center">요청하신 페이지를 찾을 수 없습니다.</h2>
      <Link href={"/"} className="mt-2 block mx-auto w-fit underline-offset-2 hover:underline">
        홈으로
      </Link>
    </main>
  );
};

export default NotFound;
