const REPO = "Jeric1223/my-claude-skills";
const BRANCH = "main";
const RAW = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;

// 새 스킬이 추가되면 재배포 없이 한 시간 안에 반영된다.
const REVALIDATE = 3600;

export type Plugin = {
  name: string;
  source: string;
  description: string;
  version: string;
  author?: { name: string };
};

export type Marketplace = {
  name: string;
  owner: { name: string; url: string };
  plugins: Plugin[];
};

async function raw(path: string): Promise<string | null> {
  const res = await fetch(`${RAW}/${path}`, { next: { revalidate: REVALIDATE } });
  if (!res.ok) return null;
  return res.text();
}

export async function getMarketplace(): Promise<Marketplace> {
  const text = await raw(".claude-plugin/marketplace.json");
  if (!text) throw new Error("marketplace.json을 읽을 수 없습니다");
  return JSON.parse(text) as Marketplace;
}

export async function getPlugin(name: string): Promise<Plugin | undefined> {
  const { plugins } = await getMarketplace();
  return plugins.find((p) => p.name === name);
}

/** "./travel-itinerary-skill" → "travel-itinerary-skill" */
export function folderOf(plugin: Plugin): string {
  return plugin.source.replace(/^\.\//, "").replace(/\/$/, "");
}

export function repoUrlOf(plugin: Plugin): string {
  return `https://github.com/${REPO}/tree/${BRANCH}/${folderOf(plugin)}`;
}

export type SkillDoc = {
  /** SKILL.md 프런트매터의 name — 실제 호출 이름 */
  skillName: string | null;
  /** 프런트매터를 걷어낸 SKILL.md 본문 */
  skillBody: string | null;
  readme: string | null;
};

export async function getSkillDoc(plugin: Plugin): Promise<SkillDoc> {
  const dir = folderOf(plugin);
  const [skill, readme] = await Promise.all([
    raw(`${dir}/SKILL.md`),
    raw(`${dir}/README.md`),
  ]);

  let skillName: string | null = null;
  let skillBody: string | null = null;

  if (skill) {
    const fm = skill.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (fm) {
      skillName = fm[1].match(/^name:\s*(.+)$/m)?.[1].trim() ?? null;
      skillBody = skill.slice(fm[0].length).trim();
    } else {
      skillBody = skill.trim();
    }
  }

  return { skillName, skillBody, readme };
}

export const MARKETPLACE_ADD = `/plugin marketplace add ${REPO}`;
export const installCommand = (plugin: Plugin, marketplaceName: string) =>
  `/plugin install ${plugin.name}@${marketplaceName}`;
