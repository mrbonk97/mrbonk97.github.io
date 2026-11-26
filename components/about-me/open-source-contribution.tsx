import Image from "next/image";

export function OpenSourceContribution() {
  return (
    <section className="mt-32">
      <h2 className="text-2xl font-semibold">오픈소스 기여</h2>

      <article className="mt-4 p-4 md:p-8 rounded bg-secondary">
        <header className="flex items-center gap-4">
          <div className="p-2 h-16 w-16 shrink-0 rounded-xl bg-background">
            <Image
              src="/icons/fastify.svg"
              alt="fastify"
              aria-hidden="true"
              width={512}
              height={512}
              className="h-full w-full object-contain"
            />
          </div>

          <h3 className="text-lg md:text-4xl font-bold">Fastify-OAuth2</h3>
        </header>

        <ol className="mt-8 pt-4 pl-8 space-y-4 border-t list-decimal marker:text-muted-foreground">
          <li>X 구 Twitter OAuth 2.0 연동 기능 구현</li>
          <li>과거 구현 방식으로 작성된 예제 코드 개선</li>
        </ol>
      </article>
    </section>
  );
}
