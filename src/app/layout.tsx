import type { Metadata } from "next";
import { Crimson_Pro, Hanken_Grotesk, JetBrains_Mono, Noto_Serif_KR } from "next/font/google";
import Link from "next/link";
import { ThemeToggle, themeScript } from "@/components/theme-toggle";
import "./globals.css";

// 폰트마다 역할이 하나씩. 세리프는 히어로 제목, 모노는 라벨과 명령어, 산세리프는 나머지 전부.
const crimson = Crimson_Pro({ subsets: ["latin"], variable: "--font-crimson", weight: ["400"] });
// Crimson Pro에 한글 글리프가 없어 폴백이 깨진다. 같은 성격의 한글 명조를 스택에 붙인다.
// 한글 서브셋은 용량이 커서 preload는 끄고, 실제로 쓰일 때 swap으로 로드한다.
const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"], // CSS2 응답에 한글 unicode-range 슬라이스가 함께 들어온다
  variable: "--font-serif-kr",
  weight: ["400"],
  display: "swap",
  preload: false,
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Jeric Skills — Claude Code 스킬 모음",
  description:
    "Claude Code에서 반복적으로 쓰는 워크플로우를 재사용 가능한 스킬로 정리한 개인 마켓플레이스.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${crimson.variable} ${notoSerifKr.variable} ${hanken.variable} ${jetbrains.variable}`}>
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="group">
              <span className="font-mono text-sm font-bold tracking-[0.14em] text-accent uppercase">
                Jeric Skills
              </span>
              <span className="block text-[11px] text-muted">
                Claude Code 스킬 마켓플레이스
              </span>
            </Link>
            <nav className="flex items-center gap-6">
              <a
                href="https://github.com/Jeric1223/my-claude-skills"
                className="label transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-32 border-t border-border">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <p className="label">Not affiliated with Anthropic</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
