process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import Link from "next/link";
import { cacheLife } from "next/cache";
import styles from "./github-grass.module.css";

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
  "use cache";

  try {
    const res = await fetch(URL, { signal: AbortSignal.timeout(10000) });

    if (!res.ok) {
      throw new Error(`GitHub 잔디 요청 실패: ${res.status}`);
    }

    const data = (await res.json()) as GithubGrassResponse;

    if (!Array.isArray(data.weeks)) {
      throw new Error("잘못된 GitHub 잔디 응답입니다.");
    }

    cacheLife("hours");
    return data;
  } catch (error) {
    console.error(error);
    cacheLife("minutes");
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
        <div className="mt-4 p-8 rounded bg-custom-200 text-custom-400">
          <p>GitHub 기여 내역을 불러오지 못했습니다.</p>
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
          className="mt-2 inline-block text-muted-foreground hover:underline"
        >
          @{grass.username}
        </Link>
      </header>

      <div className="mt-4 p-4 md:p-8 rounded border bg-custom-200 text-custom-400">
        <header>
          <p>지난 1년간 기여</p>

          <p className="mt-2 text-4xl font-semibold tracking-tight">
            {contributionCount}
            <span className="ml-2 text-lg font-normal">회</span>
          </p>

          <p className="mt-2">
            {formatDate(grass.from)} – {formatDate(grass.to)}
          </p>
        </header>

        <div className="mt-8 min-w-0">
          <div tabIndex={0} className={`pb-4 overflow-x-auto ${styles.scrollbar}`}>
            <div className="flex min-w-max gap-2">
              {grass.weeks.map((week) => {
                const daysByWeekday = new Map(
                  week.contributionDays.map((day) => [day.weekday, day]),
                );

                return (
                  <div key={week.firstDay} className="grid grid-rows-7 gap-2">
                    {Array.from({ length: 7 }, (_, weekday) => {
                      const day = daysByWeekday.get(weekday);

                      if (!day) {
                        return (
                          <div
                            key={`${week.firstDay}-${weekday}`}
                            className="size-2"
                          />
                        );
                      }

                      return (
                        <div
                          key={day.date}
                          title={`${day.date}: ${day.contributionCount}회 기여`}
                          className="relative size-2 rounded-xs transition-transform hover:scale-125"
                          style={{
                            backgroundColor: day.color,
                          }}
                        >
                          <span className="sr-only">
                            {day.date}, {day.contributionCount}회 기여
                          </span>
                        </div>
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
