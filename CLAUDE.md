# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mock API 服务，使用 Hono + Zod OpenAPI 构建，部署在 Netlify Functions 上。返回硬编码的模拟数据（用户信息、任务列表），用于前端开发联调。

## Commands

- `pnpm dev` — 本地开发服务器 (localhost:8700)，使用 tsx watch 热重载
- `pnpm netlify:dev` — 通过 Netlify CLI 启动本地开发
- `pnpm format` — 使用 Prettier 格式化代码
- `pnpm format:check` — 检查代码格式

## Architecture

**Tech stack:** Hono (OpenAPIHono) + @hono/zod-openapi + Zod，TypeScript，Netlify Functions 部署。

**代码结构采用扁平化的 routes/ + schemas/ 模式：**

- `src/app.ts` — 应用入口，注册所有路由，挂载 OpenAPI 文档 (`/doc`) 和 Swagger UI (`/ui`)，根路由 (`/`)。本地开发通过 `@hono/node-server` 启动，生产环境通过 Netlify Functions。
- `src/routes/` — 每个文件导出 `createRoute()` 定义和对应的 handler 函数。路由定义与 handler 在同一文件中。模拟数据以常量形式硬编码在路由文件内。
- `src/schemas/` — Zod schemas，使用 `.openapi()` 扩展。`common.ts` 提供分页查询 (`PaginationQuerySchema`)、成功响应 (`SuccessResponseSchema`) 和分页响应工厂函数 (`createPaginatedResponse`)。
- `netlify/functions/api.ts` — Netlify Functions 入口，通过 `hono/aws-lambda` 的 `handle` 适配 app。
- `netlify.toml` — 所有请求 `/*` 重定向到 `/.netlify/functions/api`。

**现有 API：**

- User: `GET /api/currentUser` — 获取当前用户信息
- Task: `GET /api/tasks` (分页+筛选) | `POST /api/tasks` | `PUT /api/tasks/{id}` | `DELETE /api/tasks/{id}`

**添加新 API 的模式：**

1. 在 `src/schemas/` 中定义 Zod schema（带 `.openapi()` 元数据）
2. 在 `src/routes/` 中用 `createRoute()` 定义路由并导出 handler
3. 在 `src/app.ts` 中用 `app.openapi()` 注册路由
