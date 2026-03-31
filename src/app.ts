import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { GetCurrentUserRoute, getCurrentUserHandler } from './routes/user';
import { GetTasksRoute, getTasksHandler } from './routes/task';
import { serve } from '@hono/node-server';

const app = new OpenAPIHono();

// 注册路由
app.openapi(GetCurrentUserRoute, getCurrentUserHandler);
app.openapi(GetTasksRoute, getTasksHandler);

// OpenAPI 文档
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'Fast API Mock',
    version: '1.0.0',
    description: 'Mock API 服务，提供用户和商品数据',
  },
});

// Swagger UI
app.get('/ui', swaggerUI({ url: '/doc' }));

// 根路由
app.get('/', (c) => c.json({ message: 'Fast API Mock - 访问 /ui 查看 API 文档' }));

// 本地开发启动
if (process.env.NODE_ENV !== 'production') {
  const port = 8700;
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger UI: http://localhost:${port}/ui`);
  serve({ fetch: app.fetch, port });
}

export default app;
