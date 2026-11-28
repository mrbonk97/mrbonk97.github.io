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
  return (
    <figure className="mt-8">
      <div className="p-4 rounded border">
        <div className="overflow-x-auto" tabIndex={0}>
          <table className="w-full min-w-max text-right tabular-nums">
            <caption className="sr-only">
              대상자 수별 체크박스 INP 측정값 (ms)
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
                <tr key={row.count}>
                  <th scope="row" className="px-2 py-4 font-medium">
                    {row.count.toLocaleString("ko-KR")}명
                  </th>
                  <td className="px-2 py-4">
                    {row.before.toLocaleString("ko-KR")}
                  </td>
                  <td className="px-2 py-4">
                    {row.memoization.toLocaleString("ko-KR")}
                  </td>
                  <td className="px-2 py-4">
                    {row.virtualization.toLocaleString("ko-KR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <figcaption className="mt-2 text-center font-medium text-muted-foreground">
        [대상자 수별 체크박스 INP 측정값 (ms)]
      </figcaption>
    </figure>
  );
}
