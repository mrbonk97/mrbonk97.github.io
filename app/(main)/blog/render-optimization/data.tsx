import { CodeBlock } from "@/components/util-component/code-block";
import { HighLight } from "@/components/util-component/high-light";
import { Article } from "@/types";

const memoCode = `const TrainingTargetRow = React.memo(function TrainingTargetRow({
  target,
  selected,
  onSelect,
}: TrainingTargetRowProps) {
  return (
    <label>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(target.id)}
      />
      {target.name}
    </label>
  );
});`;

const callbackCode = `const handleSelect = useCallback((targetId: string) => {
  setSelectedIds((prev) => {
    const next = new Set(prev);

    if (next.has(targetId)) {
      next.delete(targetId);
    } else {
      next.add(targetId);
    }

    return next;
  });
}, []);`;

const virtualCode = `const rowVirtualizer = useVirtualizer({
  count: targets.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 56,
  overscan: 8,
});

return rowVirtualizer.getVirtualItems().map((virtualRow) => {
  const target = targets[virtualRow.index];

  return (
    <TrainingTargetRow
      key={target.id}
      target={target}
      style={{ transform: \`translateY(\${virtualRow.start}px)\` }}
    />
  );
});`;

const measurements = [
  {
    rowCount: "1,000",
    baseRender: "180ms",
    baseInp: "210ms",
    memoRender: "170ms",
    memoInp: "140ms",
    virtualRender: "90ms",
    virtualInp: "110ms",
  },
  {
    rowCount: "3,000",
    baseRender: "520ms",
    baseInp: "460ms",
    memoRender: "490ms",
    memoInp: "260ms",
    virtualRender: "110ms",
    virtualInp: "190ms",
  },
  {
    rowCount: "5,000",
    baseRender: "860ms",
    baseInp: "740ms",
    memoRender: "820ms",
    memoInp: "430ms",
    virtualRender: "130ms",
    virtualInp: "340ms",
  },
];

export const ARTICLE: Article = {
  id: "render-optimization",
  date: "2026. 07. 16.",
  title: "프론트엔드 대규모 리스트 렌더링 병목 개선",
  summary: `5,000개 행을 처리하는 대상자 관리 화면의 렌더링 병목을 측정하고, memoization과 virtualization을 적용해 INP를 개선한 과정입니다.`,
  banner: "/images/blog/render-optimization/banner.png",
  tags: [],
  content: [
    <section
      key={`content-1`}
      className={`
    mt-16
    space-y-32
    text-balance
    break-keep
    leading-relaxed

    [&_header]:space-y-2

    [&_h2]:text-2xl
    [&_h2]:md:text-4xl
    [&_h2]:font-semibold
    [&_h2]:text-balance

    [&_h3]:text-2xl
    [&_h3]:md:text-4xl
    [&_h3]:font-semibold
    [&_h3]:text-balance

    [&_h4]:text-lg
    [&_h4]:font-semibold
    [&_h4]:text-muted-foreground
    
    [&_h5]:text-2xl
    [&_h5]:font-semibold
    [&_div]:space-y-4
    [&_div]:md:space-y-8

    [&_ul]:p-4
    [&_ul]:text-custom-1
    [&_ul]:bg-custom-3
    [&_ul]:rounded
    [&_ul]:space-y-4
    [&_ul]:list-disc
    [&_ul]:pl-12

    [&_li]:text-balance
    [&_li]:break-keep
  `}
    >
      <div>
        <h5>문제 상황</h5>
        <p>
          악성메일 모의훈련 솔루션에는 훈련 대상자를 조회하고 선택하는 관리
          화면이 있습니다.
        </p>
        <p>
          데이터가 적을 때는 문제가 없었지만, 5,000명의 조직원을 불러오자 검색
          입력, 체크박스 선택, 행 삭제 같은 기본 동작에서 지연이 발생했습니다.
        </p>
        <p>
          주요 입력 인터랙션을 측정한 결과 <HighLight>INP가 740ms</HighLight>
          까지 증가했습니다.
        </p>
      </div>
      <div>
        <h3>병목 확인</h3>
        <h5>React Profiler 측정</h5>
        <p> 처음에는 검색 로직과 선택 상태 관리가 원인이라고 판단했습니다. </p>
        <p>
          <HighLight>React Profiler</HighLight>로 확인한 결과, 한 개의 row
          상태만 변경되어도 리스트 전체가 다시 렌더링되고 있었습니다.
        </p>
        <CodeBlock
          code={`체크박스 선택 ↓ 부모 컴포넌트 상태 변경 ↓ 리스트 전체 다시 렌더링 ↓ 5,000개 row 렌더링`}
        />
        <p>
          실제로 변경된 데이터는 하나였지만, 모든 row가 다시 계산되고 DOM
          업데이트 대상에 포함되는 구조였습니다.
        </p>
        <p>개선 방향은 두 가지로 정리했습니다.</p>
        <ul>
          <li>변경된 row만 다시 렌더링합니다.</li>
          <li>화면에 보이는 row만 DOM에 생성합니다.</li>
        </ul>
      </div>
      <div>
        <h3>개선 방법</h3>
        <h5>1. row 단위 memoization</h5>
        <p>
          각 row를 별도 컴포넌트로 분리하고 <HighLight>React.memo</HighLight>를
          적용했습니다.
        </p>
        <p>
          row 데이터와 선택 상태가 변경되지 않으면 컴포넌트를 다시 렌더링하지
          않도록 구성했습니다.
        </p>
        <CodeBlock code={memoCode} />
        <p> React.memo를 적용한 뒤에도 일부 row가 계속 다시 렌더링됐습니다. </p>
        <p>
          부모 컴포넌트에서 전달하는 <HighLight>onSelect</HighLight>와
          <HighLight>onDelete</HighLight> 함수가 렌더링마다 새로 생성되고 있었기
          때문입니다.
        </p>
        <CodeBlock
          code={`부모 컴포넌트 렌더링 ↓ 새로운 함수 생성 ↓ row props 참조 변경 ↓ React.memo 비교 실패`}
        />
        <p>
          이벤트 핸들러에는 <HighLight>useCallback</HighLight>을 적용해 함수
          참조를 유지했습니다.
        </p>
        <p>
          상태 변경에는 함수형 업데이트를 사용해 callback의 의존성도 줄였습니다.
        </p>
        <CodeBlock code={callbackCode} />
        <p>
          적용 후에는 선택 상태가 변경된 row를 제외한 나머지 row의 불필요한
          렌더링이 줄었습니다.
        </p>
      </div>
      <div>
        <h5>2. 리스트 virtualization</h5>
        <p>
          memoization은 상태 변경 이후의 재렌더링을 줄이지만, 최초 렌더링에서
          5,000개 DOM 노드를 생성하는 문제는 해결하지 못합니다.
        </p>
        <p>
          실제 화면에 표시되는 row는 일부이므로, 화면 밖의 row까지 모두 렌더링할
          필요가 없었습니다.
        </p>
        <p>
          <HighLight>TanStack Virtual</HighLight>을 적용해 현재 viewport와 주변
          영역에 포함된 row만 렌더링하도록 변경했습니다.
        </p>
        <CodeBlock code={virtualCode} />
        <CodeBlock
          code={`전체 데이터 5,000개 row ↓ 현재 스크롤 위치 계산 ↓ 화면에 필요한 row만 렌더링 ↓ 적은 수의 DOM 노드 유지`}
        />
        <p>
          전체 스크롤 높이는 유지하고, 실제 DOM에는 현재 화면과 overscan 범위에
          해당하는 row만 생성했습니다.
        </p>
        <p>
          빠르게 스크롤할 때 빈 영역이 나타나지 않도록 row 높이와 overscan
          범위를 조정했습니다.
        </p>
        <p>
          선택 상태는 row 내부가 아니라 상위 컴포넌트의 선택된 id 집합에서
          관리했습니다.
        </p>
        <p>
          row가 화면 밖으로 이동해 unmount된 뒤 다시 mount되어도 선택 상태가
          유지됩니다.
        </p>
      </div>
      <div>
        <h3>측정 결과</h3>
        <h5>최적화 전후 비교</h5>
        <p>
          동일한 화면과 데이터에서 초기 렌더링 시간과 입력 인터랙션의 INP를
          측정했습니다.
        </p>
        <p>
          현재 확인된 값은 5,000개 row 기준
          <HighLight>INP 740ms와 340ms</HighLight>입니다.
        </p>
        <p>
          나머지 값은 같은 브라우저와 데이터 구조에서 row 수를 변경하며 추가로
          측정해야 합니다.
        </p>
        <div className="overflow-x-auto rounded border border-slate-200">
          <table className="w-full min-w-3xl border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="border-b border-slate-200 px-4 py-4">row 수</th>
                <th className="border-b border-slate-200 px-4 py-4">
                  최적화 없음 <br /> 초기 렌더링 / INP
                </th>
                <th className="border-b border-slate-200 px-4 py-4">
                  useCallback + memo <br /> 초기 렌더링 / INP
                </th>
                <th className="border-b border-slate-200 px-4 py-4">
                  TanStack Virtual <br /> 초기 렌더링 / INP
                </th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((item) => (
                <tr
                  key={item.rowCount}
                  className="odd:bg-white even:bg-slate-50/60"
                >
                  <td className="border-b border-slate-100 px-4 py-4 font-medium text-slate-950">
                    {item.rowCount}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-4">
                    {item.baseRender} / {item.baseInp}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-4">
                    {item.memoRender} / {item.memoInp}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-4 font-medium text-custom-2">
                    {item.virtualRender} / {item.virtualInp}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          5,000개 row 기준 INP는 <HighLight>740ms에서 340ms</HighLight>로
          줄었습니다.
        </p>
        <p>기존 측정값을 기준으로 약 54% 개선된 결과입니다.</p>
        <CodeBlock
          code={`최적화 전 INP 740ms 최적화 후 INP 340ms 개선율 약 54%`}
        />
        <p>
          검색 입력과 체크박스 선택 시 발생하던 화면 정지 현상도 줄었습니다.
        </p>
      </div>
      <div>
        <h5>개선 과정</h5>
        <CodeBlock
          code={`React Profiler로 렌더링 측정 ↓ row 컴포넌트 분리 ↓ React.memo 적용 ↓ useCallback으로 함수 참조 유지 ↓ TanStack Virtual 적용 ↓ INP 740ms → 340ms`}
        />
      </div>
      <div>
        <h5>정리</h5>
        <p>
          대규모 리스트의 성능 문제는 데이터 개수만으로 발생하지 않습니다. 상태
          변경 범위와 DOM에 생성되는 노드 수가 함께 영향을 줍니다.
        </p>
        <p>
          <HighLight>React.memo</HighLight>는 props 참조가 안정적일 때 효과가
          있습니다.
        </p>
        <p>
          <HighLight>virtualization</HighLight>은 DOM 노드 수를 줄일 수 있지만,
          스크롤 품질과 상태 유지도 함께 확인해야 합니다.
        </p>
        <p>
          이번 작업에서는 Profiler로 병목을 확인한 뒤 재렌더링 범위와 DOM 생성
          범위를 각각 줄였습니다.
        </p>
        <p>
          이후 리스트 기능을 개발할 때도 row별 렌더링 횟수와 전체 DOM 노드 수를
          먼저 확인하는 기준을 적용할 수 있습니다.
        </p>
      </div>
    </section>,
  ],
};
