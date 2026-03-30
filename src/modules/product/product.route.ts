import { createRoute } from '@hono/zod-openapi';
import { PaginationQuerySchema } from '../../common/schema';
import { ProductListResponseSchema } from './product.schema';

export const GetProductsRoute = createRoute({
  method: 'get',
  path: '/api/products',
  operationId: 'getProducts',
  tags: ['Product'],
  summary: '获取商品列表',
  request: {
    query: PaginationQuerySchema,
  },
  responses: {
    200: {
      description: '商品分页列表',
      content: {
        'application/json': {
          schema: ProductListResponseSchema,
        },
      },
    },
  },
});
