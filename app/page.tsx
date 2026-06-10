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

export default function Home() {
  const doingItems = flowItems.filter((item) => item.status === "doing");
  const doneItems = flowItems.filter((item) => item.status === "done");
  const todoItems = flowItems.filter((item) => item.status === "todo");
  const blockedItems = flowItems.filter((item) => item.status === "blocked");

  const averageProgress =
    flowItems.length === 0
      ? 0
      : Math.round(
          flowItems.reduce((sum, item) => sum + item.progress, 0) /
            flowItems.length,
        );

  return (
    <main className="min-h-screen bg-neutral-950 px-8 py-10 text-white">
      <section className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-wrap items-start justify-between gap-6">
          <div>

            <h1 className="mt-2 text-5xl font-bold tracking-tight">
              Flowing
            </h1>

          </div>

          <Link
            href="/timeline"
            className="rounded-2xl border border-neutral-700 bg-white px-5 py-3 text-sm font-medium text-neutral-950 transition hover:bg-neutral-200"
          >
            进入全屏时间线
          </Link>
        </header>

        <section className="mb-10 grid gap-4 md:grid-cols-5">
          <StatCard label="Total" value={flowItems.length} />
          <StatCard label="Doing" value={doingItems.length} />
          <StatCard label="Done" value={doneItems.length} />
          <StatCard label="Todo" value={todoItems.length} />
          <StatCard label="Progress" value={`${averageProgress}%`} />
        </section>

        {blockedItems.length > 0 && (
          <section className="mb-8 rounded-3xl border border-red-500/30 bg-red-500/10 p-5">
            <h2 className="text-lg font-semibold text-red-300">阻塞项</h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {blockedItems.map((item) => (
                <FlowCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-3">
          <FlowColumn title="进行中" items={doingItems} />
          <FlowColumn title="计划中" items={todoItems} />
          <FlowColumn title="已完成" items={doneItems} />
        </section>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-5">
      <p className="text-xs uppercase tracking-wider text-neutral-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}

function FlowColumn({
  title,
  items,
}: {
  title: string;
  items: FlowItem[];
}) {
  return (
    <section className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-sm text-neutral-500">{items.length}</span>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-neutral-800 p-4 text-sm text-neutral-500">
            暂无项目
          </p>
        ) : (
          items.map((item) => <FlowCard key={item.id} item={item} />)
        )}
      </div>
    </section>
  );
}

function FlowCard({ item }: { item: FlowItem }) {
  return (
    <article className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span
          className={`rounded-full border px-2.5 py-1 text-xs ${statusStyle[item.status]}`}
        >
          {statusLabel[item.status]}
        </span>

        <span className="text-xs text-neutral-500">{item.progress}%</span>
      </div>

      <h3 className="text-lg font-semibold">{item.title}</h3>

      <p className="mt-2 text-sm leading-6 text-neutral-400">
        {item.description}
      </p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-neutral-800">
        <div
          className="h-full rounded-full bg-white"
          style={{ width: `${item.progress}%` }}
        />
      </div>

      {item.dueDate && (
        <p className="mt-3 text-xs text-neutral-500">
          预计完成：{item.dueDate}
        </p>
      )}

      {item.nextAction && (
        <p className="mt-2 text-xs text-neutral-400">
          下一步：{item.nextAction}
        </p>
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
    </article>
  );
}