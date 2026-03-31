import { createRoute, type RouteHandler } from '@hono/zod-openapi';
import { z } from '@hono/zod-openapi';
import { PaginationQuerySchema } from '../schemas/common';
import { TaskListResponseSchema, TASK_STATUS } from '../schemas/task';

const tasks = [
  { id: 1, name: '完成首页设计稿', status: 'done' as const, priority: 'high' as const, assignee: '张三', description: '根据产品需求完成首页UI设计', createdAt: '2025-05-20', deadline: '2025-06-01' },
  { id: 2, name: '用户登录接口开发', status: 'done' as const, priority: 'high' as const, assignee: '李四', description: '实现JWT登录认证接口', createdAt: '2025-05-22', deadline: '2025-06-05' },
  { id: 3, name: '编写单元测试', status: 'progress' as const, priority: 'medium' as const, assignee: '王五', description: '为核心模块补充单元测试用例', createdAt: '2025-05-25', deadline: '2025-06-10' },
  { id: 4, name: '数据库表结构设计', status: 'done' as const, priority: 'high' as const, assignee: '李四', description: '设计用户和订单相关数据表', createdAt: '2025-05-18', deadline: '2025-05-28' },
  { id: 5, name: '部署测试环境', status: 'todo' as const, priority: 'medium' as const, assignee: '赵六', description: '搭建CI/CD流水线并部署测试环境', createdAt: '2025-06-01', deadline: '2025-06-15' },
  { id: 6, name: '产品需求评审', status: 'progress' as const, priority: 'high' as const, assignee: '张三', description: '组织二期需求评审会议', createdAt: '2025-06-02', deadline: '2025-06-08' },
  { id: 7, name: '修复登录页样式问题', status: 'todo' as const, priority: 'low' as const, assignee: '王五', description: '修复移动端登录页按钮错位', createdAt: '2025-06-03', deadline: '2025-06-20' },
  { id: 8, name: '接口文档编写', status: 'progress' as const, priority: 'medium' as const, assignee: '赵六', description: '整理并编写API接口文档', createdAt: '2025-06-01', deadline: '2025-06-12' },
  { id: 9, name: '性能优化方案调研', status: 'todo' as const, priority: 'medium' as const, assignee: '李四', description: '调研前端首屏加载优化方案', createdAt: '2025-06-05', deadline: '2025-06-25' },
  { id: 10, name: '权限模块开发', status: 'todo' as const, priority: 'high' as const, assignee: '张三', description: '实现RBAC权限管理模块', createdAt: '2025-06-06', deadline: '2025-06-30' },
  { id: 11, name: '客户反馈整理', status: 'done' as const, priority: 'low' as const, assignee: '王五', description: '汇总并分类近期客户反馈', createdAt: '2025-05-28', deadline: '2025-06-05' },
  { id: 12, name: '移动端适配', status: 'progress' as const, priority: 'medium' as const, assignee: '赵六', description: '完成主要页面的移动端响应式适配', createdAt: '2025-06-04', deadline: '2025-06-18' },
  { id: 13, name: '搜索功能开发', status: 'todo' as const, priority: 'high' as const, assignee: '李四', description: '实现全站搜索功能，支持模糊匹配', createdAt: '2025-06-07', deadline: '2025-06-28' },
  { id: 14, name: '日志系统接入', status: 'done' as const, priority: 'medium' as const, assignee: '赵六', description: '接入ELK日志收集和分析平台', createdAt: '2025-05-15', deadline: '2025-05-30' },
  { id: 15, name: '消息通知模块', status: 'progress' as const, priority: 'high' as const, assignee: '张三', description: '开发站内消息和邮件通知功能', createdAt: '2025-06-08', deadline: '2025-06-22' },
  { id: 16, name: '数据导出功能', status: 'todo' as const, priority: 'low' as const, assignee: '王五', description: '支持列表数据导出为Excel', createdAt: '2025-06-09', deadline: '2025-07-01' },
  { id: 17, name: '代码review规范制定', status: 'done' as const, priority: 'medium' as const, assignee: '李四', description: '制定团队代码审查流程和规范', createdAt: '2025-05-10', deadline: '2025-05-20' },
  { id: 18, name: '国际化方案设计', status: 'todo' as const, priority: 'medium' as const, assignee: '张三', description: '设计前端多语言国际化方案', createdAt: '2025-06-10', deadline: '2025-07-05' },
  { id: 19, name: '监控告警配置', status: 'progress' as const, priority: 'high' as const, assignee: '赵六', description: '配置服务监控和异常告警规则', createdAt: '2025-06-05', deadline: '2025-06-16' },
  { id: 20, name: '用户反馈页面开发', status: 'todo' as const, priority: 'low' as const, assignee: '王五', description: '开发用户意见反馈提交页面', createdAt: '2025-06-11', deadline: '2025-07-10' },
  { id: 21, name: '缓存策略优化', status: 'done' as const, priority: 'high' as const, assignee: '李四', description: '优化Redis缓存策略减少数据库压力', createdAt: '2025-05-25', deadline: '2025-06-08' },
  { id: 22, name: '文件上传组件封装', status: 'progress' as const, priority: 'medium' as const, assignee: '王五', description: '封装通用文件上传组件支持拖拽', createdAt: '2025-06-08', deadline: '2025-06-20' },
  { id: 23, name: '接口限流方案', status: 'todo' as const, priority: 'medium' as const, assignee: '赵六', description: '设计并实现API接口限流策略', createdAt: '2025-06-12', deadline: '2025-07-02' },
  { id: 24, name: '自动化部署脚本', status: 'done' as const, priority: 'medium' as const, assignee: '赵六', description: '编写生产环境自动化部署脚本', createdAt: '2025-05-20', deadline: '2025-06-01' },
  { id: 25, name: '报表统计页面', status: 'progress' as const, priority: 'high' as const, assignee: '张三', description: '开发数据报表统计和可视化页面', createdAt: '2025-06-10', deadline: '2025-06-25' },
];

const TaskQuerySchema = PaginationQuerySchema.extend({
  name: z.string().optional().openapi({ description: '按任务名称搜索', example: '设计' }),
  status: z.enum(TASK_STATUS).optional().openapi({ description: '按状态筛选', example: 'todo' }),
});

export const GetTasksRoute = createRoute({
  method: 'get',
  path: '/api/tasks',
  operationId: 'getTasks',
  tags: ['Task'],
  summary: '获取任务列表',
  request: {
    query: TaskQuerySchema,
  },
  responses: {
    200: {
      description: '任务分页列表',
      content: {
        'application/json': {
          schema: TaskListResponseSchema,
        },
      },
    },
  },
});

export const getTasksHandler: RouteHandler<typeof GetTasksRoute> = (c) => {
  const { page: pageStr, pageSize: pageSizeStr, name, status } = c.req.valid('query');
  const page = Number(pageStr);
  const pageSize = Number(pageSizeStr);

  let filtered = tasks;
  if (name) {
    filtered = filtered.filter((t) => t.name.includes(name));
  }
  if (status) {
    filtered = filtered.filter((t) => t.status === status);
  }

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return c.json({ data, total, page, pageSize });
};
