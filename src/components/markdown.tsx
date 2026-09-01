import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

export async function Markdown({ source }: { source: string }) {
  const html = await marked.parse(source);
  return (
    <div
      className="prose prose-neutral dark:prose-invert max-w-none
        prose-headings:font-sans prose-headings:font-semibold prose-headings:tracking-tight
        prose-h1:text-2xl prose-h2:text-lg prose-h2:mt-10 prose-h3:text-base
        prose-p:text-[15px] prose-p:leading-7 prose-li:text-[15px]
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-code:font-mono prose-code:text-[13px] prose-code:before:content-none prose-code:after:content-none
        prose-code:rounded prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5
        prose-pre:rounded-[var(--radius-card)] prose-pre:border prose-pre:border-border prose-pre:bg-surface
        prose-table:text-[14px] prose-th:font-mono prose-th:text-xs prose-th:uppercase prose-th:tracking-wider
        prose-hr:border-border prose-blockquote:border-accent"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
