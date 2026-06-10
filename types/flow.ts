export type FlowStatus = "done" | "doing" | "todo" | "blocked";

export type FlowItem = {
  id: string;
  title: string;
  status: FlowStatus;
  description: string;
  startDate?: string;
  dueDate?: string;
  progress: number;
  tags?: string[];
  nextAction?: string;
};