type Measurement = {
  count: number;
  before: number;
  memoization: number;
  virtualization: number;
};

export function MailPerformance({
  measurements,
}: {
  measurements: Measurement[];
}) {
  const largest = measurements.reduce((previous, row) =>
    row.count > previous.count ? row : previous,
  );
  const reduction = Math.round(
    (1 - largest.memoization / largest.before) * 100,
  );
  const scale =
    Math.ceil(
      Math.max(largest.before, largest.memoization, largest.virtualization) /
        100,
    ) * 100;
  return (
    <figure className="mt-8">
      <figcaption className="text-custom-100 dark:text-custom-300">
        <p className="font-medium">최적화 방식에 따른 체크박스 반응시간</p>
        <p className="mt-2 text-muted-foreground">
          Chrome DevTools로 측정한 INP입니다. 낮을수록 빠릅니다.
        </p>
      </figcaption>
      <div className="mt-4 p-4 lg:p-8 rounded border">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <p className="font-medium">
            대상자 {largest.count.toLocaleString("ko-KR")}명 기준
          </p>
          <p className="text-2xl font-semibold text-custom-200 dark:text-custom-300">
            약 {reduction}% 단축
          </p>
        </div>
        <div className="space-y-4">
          {[
            {
              name: "최적화 전",
              value: largest.before,
              color: "bg-custom-300 dark:bg-custom-300/30",
            },
            {
              name: "메모이제이션 (최종 적용)",
              value: largest.memoization,
              color: "bg-custom-200",
            },
            {
              name: "가상 스크롤 (비교 실험)",
              value: largest.virtualization,
              color: "bg-custom-100 dark:bg-custom-300",
            },
          ].map((bar) => (
            <div key={bar.name}>
              <div className="mb-2 flex justify-between gap-4">
                <p>{bar.name}</p>
                <p className="shrink-0 font-mono">{bar.value}ms</p>
              </div>
              <div className="h-4 overflow-hidden rounded bg-custom-400 dark:bg-custom-100/30">
                <div
                  className={`h-full rounded ${bar.color}`}
                  style={{ width: `${(bar.value / scale) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-muted-foreground">
          <span>0ms</span>
          <span>{scale}ms</span>
        </div>
        <div className="mt-8 overflow-x-auto" tabIndex={0}>
          <table className="w-full min-w-max text-right tabular-nums">
            <caption className="mb-4 text-left font-medium">
              대상자 수별 전체 측정값 (ms)
            </caption>
            <thead className="border-b">
              <tr>
                {["대상자 수", "최적화 전", "메모이제이션", "가상 스크롤"].map(
                  (name) => (
                    <th
                      key={name}
                      scope="col"
                      className="px-2 py-4 align-bottom font-medium"
                    >
                      {name}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y border-b">
              {measurements.map((row) => (
                <tr
                  key={row.count}
                  className={
                    row.count === largest.count ? "bg-custom-200/10" : undefined
                  }
                >
                  <th scope="row" className="px-2 py-4 font-medium">
                    {row.count.toLocaleString("ko-KR")}명
                  </th>
                  <td className="px-2 py-4">{row.before}</td>
                  <td className="px-2 py-4 font-medium text-custom-200 dark:text-custom-300">
                    {row.memoization}
                  </td>
                  <td className="px-2 py-4 text-custom-100 dark:text-custom-300">
                    {row.virtualization}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 text-muted-foreground">
        {largest.before}ms → {largest.memoization}ms. 브라우저 검색과 연속
        복사를 유지하면서 반응시간을 줄인 메모이제이션을 최종 적용했습니다.
      </p>
    </figure>
  );
}
