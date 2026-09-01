import { CopyCommand } from "@/components/copy-command";
import { SkillCard } from "@/components/skill-card";
import { getMarketplace, MARKETPLACE_ADD } from "@/lib/skills";

export default async function Home() {
  const { name, plugins, owner } = await getMarketplace();

  return (
    <>
      {/* 히어로 — 검색창 대신 설치 명령어가 주인공이다. 스킬이 몇 개 안 되니 찾을 게 없다. */}
      <section className="bloom relative isolate px-6 pt-28 pb-24 text-center">
        <p className="label">{owner.name}의 Claude Code 스킬</p>

        <h1 className="mx-auto mt-8 max-w-3xl font-serif text-5xl leading-[1.15] font-normal text-balance sm:text-6xl">
          한 번 쓰고 버리는 프롬프트 대신, 다시 쓰는 스킬
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-7 text-muted">
          반복되는 작업의 순서·형식·검증 기준을 문서로 못 박아두면, 다음에도 같은 품질로
          재현된다. 마켓플레이스를 한 번 등록하면 원하는 스킬만 골라 설치할 수 있다.
        </p>

        <div className="mx-auto mt-10 max-w-xl">
          <CopyCommand command={MARKETPLACE_ADD} />
        </div>

        <p className="mt-8 font-mono text-xs tracking-wider text-muted">
          {plugins.length} skills · marketplace{" "}
          <span className="text-foreground">{name}</span>
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <h2 className="label">스킬</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {plugins.map((p) => (
            <SkillCard key={p.name} plugin={p} marketplace={name} />
          ))}
        </div>
      </section>
    </>
  );
}
