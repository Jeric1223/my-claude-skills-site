import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyCommand } from "@/components/copy-command";
import { Markdown } from "@/components/markdown";
import {
  getMarketplace,
  getPlugin,
  getSkillDoc,
  installCommand,
  repoUrlOf,
} from "@/lib/skills";

export async function generateStaticParams() {
  const { plugins } = await getMarketplace();
  return plugins.map((p) => ({ name: p.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const plugin = await getPlugin(name);
  if (!plugin) return {};
  return { title: `${plugin.name} — Jeric Skills`, description: plugin.description };
}

export default async function SkillPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const [plugin, marketplace] = await Promise.all([getPlugin(name), getMarketplace()]);
  if (!plugin) notFound();

  const doc = await getSkillDoc(plugin);

  return (
    <article className="mx-auto max-w-3xl px-6 pt-16 pb-24">
      <Link href="/" className="label transition-colors hover:text-foreground">
        ← 전체 스킬
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="font-serif text-4xl leading-tight">{plugin.name}</h1>
          <span className="label">v{plugin.version}</span>
        </div>
        <p className="mt-4 text-[15px] leading-7 text-muted">{plugin.description}</p>
      </header>

      <div className="mt-8 space-y-3">
        <CopyCommand command={installCommand(plugin, marketplace.name)} label="설치" />
        {doc.skillName && (
          <p className="flex flex-wrap items-baseline gap-2">
            <span className="label">호출 이름</span>
            {/* 슬래시 명령어는 소문자가 원문이므로 라벨의 uppercase를 상속시키지 않는다 */}
            <code className="font-mono text-sm text-foreground">
              /{plugin.name}:{doc.skillName}
            </code>
          </p>
        )}
      </div>

      {doc.readme && (
        <section className="mt-16">
          <Markdown source={doc.readme} />
        </section>
      )}

      {doc.skillBody && (
        <section className="mt-20">
          <h2 className="label">에이전트가 읽는 절차 — SKILL.md</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            설치하면 Claude가 실행 중에 참조하는 실제 문서다. 아래 내용이 그대로 동작을 결정한다.
          </p>
          <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-surface p-8">
            <Markdown source={doc.skillBody} />
          </div>
        </section>
      )}

      <div className="mt-16 border-t border-border pt-6">
        <a href={repoUrlOf(plugin)} className="label transition-colors hover:text-accent">
          GitHub에서 소스 보기 →
        </a>
      </div>
    </article>
  );
}
