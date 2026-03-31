# Fast API Mock

基于 **Hono + Zod OpenAPI** 的 Mock API 服务，提供用户和商品等模拟数据接口，用于前端开发联调。部署在 Netlify Functions 上。

## 技术栈

- [Hono](https://hono.dev/) — 轻量 Web 框架（OpenAPIHono）
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi) — 基于 Zod 的 OpenAPI 路由定义
- [Zod](https://zod.dev/) — Schema 验证与类型推导
- [Netlify Functions](https://docs.netlify.com/functions/overview/) — Serverless 部署

## 快速开始

```bash
# 安装依赖
pnpm install

# 本地开发 (localhost:8700)
pnpm dev
```

启动后访问：

- API 根路由：http://localhost:8700/
- Swagger UI：http://localhost:8700/ui
- OpenAPI JSON：http://localhost:8700/doc

## API 接口

| 方法 | 路径            | 说明                                            |
| ---- | --------------- | ----------------------------------------------- |
| GET  | `/api/user`     | 获取用户信息                                    |
| GET  | `/api/products` | 获取商品列表（支持分页：`?page=1&pageSize=10`） |

## 项目结构

```
src/
├── app.ts              # 应用入口，注册路由与文档
├── routes/             # 路由定义 + Handler
│   ├── user.ts
│   └── product.ts
└── schemas/            # Zod Schema（带 OpenAPI 元数据）
    ├── common.ts       # 通用 Schema（分页等）
    ├── user.ts
    └── product.ts
netlify/
└── functions/api.ts    # Netlify Functions 入口
```

## 部署

项目通过 Netlify 自动部署，所有请求经 `netlify.toml` 重定向到 Netlify Functions 处理。

```bash
# 本地模拟 Netlify 环境
pnpm netlify:dev
```
