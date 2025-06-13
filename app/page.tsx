import { IcosObject } from "@/components/3d/icos-object";
import { notoSerif } from "@/lib/font";

const HomePage = () => {
  return (
    <main
      className={`pt-20 p-5 mx-auto min-h-[600px] h-full max-w-[1520px] font-bold flex flex-col text-custom-1 justify-between ${notoSerif.className}`}
    >
      <hgroup className="h-1/4 pt-2">
        <h1 className="text-5xl md:text-6xl xl:text-8xl">
          Security
          <br /> & Dev
        </h1>
        <h2 className="mt-2 text-xs md:text-sm lg:text-base opacity-80">
          보안과 개발에 진심인 사나이
        </h2>
      </hgroup>
      <IcosObject />
      <div className="h-1/4 flex items-end">
        <p className="ml-auto text-xs md:text-sm lg:text-base font-semibold text-right break-keep">
          회사에서는 보안 업무를 담당하면서, 틈틈이 개인 프로젝트도 진행하고 있습니다.
          <br className="hidden xs:block" />이 블로그에서는 그 과정에서 배우고 경험한 내용을
          공유합니다.
        </p>
      </div>
    </main>
  );
};

export default HomePage;
