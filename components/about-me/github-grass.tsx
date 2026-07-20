import Link from "next/link";

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

interface ContributionDay {
  date: string;
  weekday: number;
  contributionCount: number;
  contributionLevel: ContributionLevel;
  color: string;
}

interface ContributionWeek {
  firstDay: string;
  contributionDays: ContributionDay[];
}

interface GithubGrassResponse {
  username: string;
  name: string | null;
  avatarUrl: string;
  profileUrl: string;
  from: string;
  to: string;
  totalContributions: number;
  colors: string[];
  weeks: ContributionWeek[];
}

const URL = "https://github-grass.up.railway.app/grass/mrbonk97";

async function getGithubGrass(): Promise<GithubGrassResponse | null> {
  try {
    const res = await fetch(URL);

    if (!res.ok) {
      throw new Error(`GitHub 잔디 요청 실패: ${res.status}`);
    }

    const data = (await res.json()) as GithubGrassResponse;

    if (!Array.isArray(data.weeks)) {
      throw new Error("잘못된 GitHub 잔디 응답입니다.");
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export async function GithubGrass() {
  const grass = await getGithubGrass();

  if (!grass) {
    return (
      <section className="mt-32">
        <header>
          <h2 className="text-2xl font-semibold">GitHub 잔디</h2>
        </header>
        <div className="mt-4 p-8 rounded text-custom-4 bg-custom-2">
          <p className="text-sm">GitHub 기여 내역을 불러오지 못했습니다.</p>
        </div>
      </section>
    );
  }

  const contributionCount = new Intl.NumberFormat("ko-KR").format(
    grass.totalContributions,
  );

  return (
    <section className="mt-32">
      <header>
        <h2 className="text-2xl font-semibold">GitHub 잔디</h2>
        <Link
          href={grass.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 text-sm text-muted-foreground"
        >
          @{grass.username}
        </Link>
      </header>

      <div className="mt-4 p-4 md:p-8 rounded bg-custom-2 text-custom-4">
        <header>
          <p className="text-sm">지난 1년간 기여</p>

          <p className="mt-2 text-4xl font-semibold tracking-tight">
            {contributionCount}
            <span className="ml-2 text-base font-normal">회</span>
          </p>

          <p className="mt-2 text-sm">
            {formatDate(grass.from)} – {formatDate(grass.to)}
          </p>
        </header>

        <div className="mt-8 mx-auto lg:w-fit">
          <div className="overflow-x-auto pb-4">
            <div className="flex min-w-max gap-1">
              {grass.weeks.map((week) => {
                const daysByWeekday = new Map(
                  week.contributionDays.map((day) => [day.weekday, day]),
                );

                return (
                  <div key={week.firstDay} className="grid grid-rows-7 gap-1">
                    {Array.from({ length: 7 }, (_, weekday) => {
                      const day = daysByWeekday.get(weekday);

                      if (!day) {
                        return (
                          <div
                            key={`${week.firstDay}-${weekday}`}
                            className="size-[11px]"
                          />
                        );
                      }

                      return (
                        <div
                          key={day.date}
                          title={`${day.date}: ${day.contributionCount}회 기여`}
                          aria-label={`${day.date}, ${day.contributionCount}회 기여`}
                          className="size-[11px] rounded-[2px] ring-1 ring-black/5 transition-transform hover:scale-125"
                          style={{
                            backgroundColor: day.color,
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
