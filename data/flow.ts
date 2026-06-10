import type { FlowItem } from "@/types/flow";

export const flowItems: FlowItem[] = [
  {
    id: "docker-deploy",
    title: "Docker 工业化部署",
    status: "doing",
    description: "整理 Minecraft 子服容器化部署流程，解决镜像、构建和 Compose 问题。",
    startDate: "2026-05-27",
    dueDate: "2026-06-02",
    progress: 35,
    tags: ["Docker", "Deploy"],
    nextAction: "确认 Java 镜像源与 Dockerfile 构建流程",
  },
  {
    id: "flow-board",
    title: "Flow 展示页面",
    status: "todo",
    description: "展示当前项目进度、计划、完成日期和下一步动作。",
    startDate: "2026-05-26",
    dueDate: "2026-06-01",
    progress: 0,
    tags: ["Next.js", "React", "Tailwind"],
    nextAction: "完成三栏布局和任务卡片",
  },
];