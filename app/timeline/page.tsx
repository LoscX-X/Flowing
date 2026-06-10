import Link from "next/link";
import { flowItems } from "@/data/flow";
import type { FlowItem } from "@/types/flow";

const statusLabel: Record<FlowItem["status"], string> = {
  done: "已完成",
  doing: "进行中",
  todo: "计划中",
  blocked: "阻塞中",
};

const statusStyle: Record<FlowItem["status"], string> = {
  done: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  doing: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  todo: "border-neutral-600 bg-neutral-800 text-neutral-300",
  blocked: "border-red-500/40 bg-red-500/10 text-red-300",
};

function getSortTime(item: FlowItem) {
  return new Date(item.dueDate ?? item.startDate ?? "9999-12-31").getTime();
}

export default function TimelinePage() {
  const sortedItems = [...flowItems].sort(
    (a, b) => getSortTime(a) - getSortTime(b),
  );

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_35%)]" />

      <section className="relative flex h-full w-full flex-col px-10 py-8">
        <header className="flex items-start justify-between gap-8">
          <div>
            <p className="text-sm text-neutral-400">CenFlow Board</p>

            <h1 className="mt-2 text-5xl font-bold tracking-tight">
              Project Flow Timeline
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-400">
              横向展示项目状态。鼠标悬停卡片可查看完整详情。
            </p>
          </div>

          <Link
            href="/"
            className="rounded-2xl border border-neutral-700 bg-neutral-900/80 px-5 py-3 text-sm text-neutral-300 transition hover:border-neutral-500 hover:text-white"
          >
            返回总览
          </Link>
        </header>

        <section className="relative mt-8 min-h-0 flex-1 overflow-visible rounded-4xl border border-neutral-800 bg-neutral-900/35 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent_35%)]" />

          <div className="relative h-full overflow-x-auto overflow-y-visible">
            <div className="relative flex h-full min-w-max items-center px-24">
              <div className="absolute left-24 right-24 top-1/2 h-px -translate-y-1/2 bg-neutral-700" />

              <div className="flex items-center gap-20">
                {sortedItems.map((item, index) => (
                    <article
                    key={item.id}
                    className="group relative h-[640px] w-64 shrink-0"
                    >
                    <div className="absolute left-1/2 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-600 bg-neutral-950 transition-all duration-300 group-hover:scale-125 group-hover:border-white group-hover:shadow-lg group-hover:shadow-white/10">
                      <div className="h-3 w-3 rounded-full bg-white" />
                    </div>

                    <div
                      className={`absolute left-1/2 z-20 w-60 -translate-x-1/2 transition-all duration-300 group-hover:z-40 group-hover:w-96 group-hover:scale-110 ${
                        index % 2 === 0
                          ? "bottom-[calc(50%+3rem)]"
                          : "top-[calc(50%+3rem)]"
                      }`}
                    >
                      <div className="rounded-3xl border border-neutral-800 bg-neutral-950/75 p-5 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-300 group-hover:border-neutral-500 group-hover:bg-neutral-950/95 group-hover:shadow-2xl group-hover:shadow-black/70">
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs ${statusStyle[item.status]}`}
                          >
                            {statusLabel[item.status]}
                          </span>

                          <span className="text-xs text-neutral-500">
                            {item.progress}%
                          </span>
                        </div>

                        <h2 className="truncate text-lg font-semibold text-neutral-100 transition-all duration-300 group-hover:whitespace-normal group-hover:text-2xl">
                          {item.title}
                        </h2>

                        {item.dueDate && (
                          <p className="mt-2 text-xs text-neutral-500">
                            预计完成：{item.dueDate}
                          </p>
                        )}

                        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-neutral-800">
                          <div
                            className="h-full rounded-full bg-white"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>

                        <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-[420px] group-hover:opacity-100">
                          <p className="text-sm leading-6 text-neutral-400">
                            {item.description}
                          </p>

                          {item.nextAction && (
                            <div className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-4">
                              <p className="text-xs text-neutral-500">
                                下一步
                              </p>
                              <p className="mt-1 text-sm leading-6 text-neutral-300">
                                {item.nextAction}
                              </p>
                            </div>
                          )}

                          {item.tags && item.tags.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border border-neutral-700 px-2.5 py-1 text-xs text-neutral-400"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {(item.startDate || item.dueDate) && (
                            <div className="mt-4 flex flex-wrap gap-3 text-xs text-neutral-500">
                              {item.startDate && (
                                <span>开始：{item.startDate}</span>
                              )}
                              {item.dueDate && (
                                <span>截止：{item.dueDate}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}