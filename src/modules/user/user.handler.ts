import type { RouteHandler } from '@hono/zod-openapi';
import type { GetUserRoute } from './user.route';

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
