import { z } from '@hono/zod-openapi';

export const UserSchema = z
  .object({
    id: z.number().openapi({ description: '用户ID', example: 1 }),
    username: z.string().openapi({ description: '用户名', example: 'johndoe' }),
    email: z.string().email().openapi({ description: '邮箱', example: 'johndoe@example.com' }),
    avatar: z.string().url().openapi({ description: '头像', example: 'https://api.dicebear.com/9.x/avataaars/svg?seed=johndoe' }),
    firstName: z.string().openapi({ description: '名', example: 'John' }),
    lastName: z.string().openapi({ description: '姓', example: 'Doe' }),
  })
  .openapi('User');
