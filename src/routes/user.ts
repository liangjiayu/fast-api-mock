import { createRoute, type RouteHandler } from '@hono/zod-openapi';
import { UserSchema } from '../schemas/user';

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

export const getUserHandler: RouteHandler<typeof GetUserRoute> = (c) => {
  return c.json({
    id: 1,
    username: 'johndoe',
    email: 'johndoe@example.com',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=johndoe',
    firstName: 'John',
    lastName: 'Doe',
  });
};
