import { createRoute } from '@hono/zod-openapi';
import { UserSchema } from './user.schema';

export const GetUserRoute = createRoute({
  method: 'get',
  path: '/api/user',
  operationId: 'getUser',
  tags: ['User'],
  summary: '获取用户信息',
  responses: {
    200: {
      description: '用户信息',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
  },
});
