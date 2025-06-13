import { AWARD, CAREER, CERT, EDUCATION } from "@/constant";
import Image from "next/image";

const AboutmePage = () => {
  return (
    <main className="pt-20 p-5 mx-auto max-w-6xl">
      <header className="mt-20">
        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold text-center text-custom-1">
          行法
        </h1>
        <p className="mt-10 text-base sm:text-lg font-medium text-center text-custom-1">
          보안 분야에서 일하며, <br className="sm:hidden" />
          취미로 웹 개발을 하고 있습니다.
        </p>
      </header>

      <section className="mt-40">
        <h2 className="mx-auto max-w-4xl text-2xl font-semibold opacity-80">경력</h2>
        <ul className="mt-5 md:mt-10 space-y-10">
          {CAREER.map((item) => (
            <li key={item.id} className="mx-auto p-5 md:p-10 max-w-xl rounded-xl bg-secondary">
              <h3 className="text-2xl md:text-3xl font-semibold">{item.company}</h3>
              <p className="mt-2 md:text-lg font-semibold">기간: {item.duration}</p>
              <p className="mt-0 md:text-lg font-semibold">부서: {item.department}</p>
              <Image
                src={item.imgUrl}
                alt={item.company}
                height={512}
                width={512}
                className="my-20 mx-auto max-h-32 max-w-80 object-contain"
              />
              <div className="mt-5 md:text-2xl font-semibold text-right">업무 내용</div>
              <p className="md:mt-2 text-sm md:text-base font-medium text-right break-keep">
                {item.workDesc}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-40">
        <h2 className="mx-auto max-w-4xl text-2xl font-semibold opacity-80">학력</h2>
        <ul className="mt-5 md:mt-10 space-y-10">
          {EDUCATION.map((item) => (
            <li key={item.id} className="mx-auto p-5 md:p-10 max-w-xl rounded-xl bg-secondary">
              <h3 className="text-2xl md:text-3xl font-semibold">{item.school}</h3>
              <p className="mt-2 md:text-lg font-semibold">기간: {item.duration}</p>
              <Image
                src={item.imgUrl}
                alt={item.school}
                height={512}
                width={512}
                className="my-20 mx-auto max-h-32 max-w-80 object-contain"
              />
              <div className="mt-5 md:text-2xl font-semibold text-right">학과</div>
              <p className="md:mt-2 text-sm md:text-base font-medium text-right break-keep">
                {item.major}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-40">
        <h2 className="mx-auto max-w-4xl text-2xl font-semibold opacity-80">자격증</h2>
        <ul className="mt-5 md:mt-10 space-y-10">
          {CERT.map((item) => (
            <li key={item.id} className="mx-auto p-5 md:p-10 max-w-xl rounded-xl bg-secondary">
              <div className="text-2xl md:text-3xl font-semibold">{item.title}</div>
              <p className="mt-2 md:text-lg font-semibold">{item.date}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-40">
        <h2 className="mx-auto max-w-4xl text-2xl font-semibold opacity-80">수상내역</h2>
        <ul className="mt-10 space-y-10">
          {AWARD.map((item) => (
            <li key={item.id} className="mx-auto p-5 md:p-10 max-w-xl rounded-xl bg-secondary">
              <h3 className="text-xl md:text-2xl font-semibold break-keep">{item.title}</h3>
              <p className="mt-2 text-sm md:text-base font-semibold">날짜: {item.data}</p>
              <p className="mt-0 text-sm md:text-base font-semibold">주최: {item.asd2}</p>
              <p className="mt-2 text-sm md:text-base font-semibold">{item.asd}</p>

              <p className="mt-10 text-sm md:text-base font-medium break-keep">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default AboutmePage;
