import { createRoute, type RouteHandler } from '@hono/zod-openapi';
import { CurrentUserSchema } from '../schemas/user';

export const GetCurrentUserRoute = createRoute({
  method: 'get',
  path: '/api/currentUser',
  operationId: 'getCurrentUser',
  tags: ['User'],
  summary: '获取当前用户信息',
  responses: {
    200: {
      description: '当前用户信息',
      content: {
        'application/json': {
          schema: CurrentUserSchema,
        },
      },
    },
  },
});

export const getCurrentUserHandler: RouteHandler<typeof GetCurrentUserRoute> = (c) => {
  return c.json({
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  });
};
