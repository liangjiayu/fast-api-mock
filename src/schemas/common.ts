import { z } from 'zod';

export const PaginationQuerySchema = z.object({
  page: z.string().optional().default('1').openapi({ description: '页码', example: '1' }),
  pageSize: z.string().optional().default('10').openapi({ description: '每页数量', example: '10' }),
});

export function createPaginatedResponse<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    data: z.array(itemSchema).openapi({ description: '数据列表' }),
    total: z.number().openapi({ description: '总数', example: 100 }),
    page: z.number().openapi({ description: '当前页码', example: 1 }),
    pageSize: z.number().openapi({ description: '每页数量', example: 10 }),
  });
}
