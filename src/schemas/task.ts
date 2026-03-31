import { z } from '@hono/zod-openapi';
import { createPaginatedResponse } from './common';

export const TASK_STATUS = ['todo', 'progress', 'done'] as const;
export const TASK_PRIORITY = ['low', 'medium', 'high'] as const;

export const TaskSchema = z
  .object({
    id: z.number().openapi({ description: '任务ID', example: 1 }),
    name: z.string().openapi({ description: '任务名称', example: '完成首页设计稿' }),
    status: z.enum(TASK_STATUS).openapi({ description: '任务状态', example: 'todo' }),
    priority: z.enum(TASK_PRIORITY).openapi({ description: '优先级', example: 'medium' }),
    assignee: z.string().openapi({ description: '负责人', example: '张三' }),
    description: z.string().openapi({ description: '任务描述', example: '根据产品需求完成首页UI设计' }),
    createdAt: z.string().openapi({ description: '创建时间', example: '2025-06-01' }),
    deadline: z.string().openapi({ description: '截止时间', example: '2025-06-15' }),
  })
  .openapi('Task');

export const TaskListResponseSchema = createPaginatedResponse(TaskSchema).openapi('TaskListResponse');
