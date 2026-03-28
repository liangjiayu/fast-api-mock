import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { Context } from 'hono'

// Schemas
const ProductSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: 'Laptop' }),
    price: z.number().openapi({ example: 1200 }),
  })
  .openapi('Product')

const ProductsResponseSchema = z
  .object({
    data: z.array(ProductSchema),
    total: z.number().openapi({ example: 25 }),
    page: z.number().openapi({ example: 1 }),
    pageSize: z.number().openapi({ example: 10 }),
  })
  .openapi('ProductsResponse')

// Route
export const getProductsRoute = createRoute({
  method: 'get',
  path: '/api/products',
  operationId: 'getProducts',
  tags: ['Products'],
  request: {
    query: z.object({
      page: z.string().optional().default('1'),
      pageSize: z.string().optional().default('10'),
    }),
  },
  responses: {
    200: {
      description: 'List of products',
      content: {
        'application/json': {
          schema: ProductsResponseSchema,
        },
      },
    },
  },
})

// Handler
export const getProducts = (c: Context) => {
  const { page, pageSize } = c.req.valid('query')
  const products = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 50,
  }));

  const pageInt = parseInt(page, 10);
  const pageSizeInt = parseInt(pageSize, 10);

  const total = products.length;
  const paginatedProducts = products.slice((pageInt - 1) * pageSizeInt, pageInt * pageSizeInt);

  return c.json({
    data: paginatedProducts,
    total,
    page: pageInt,
    pageSize: pageSizeInt,
  });
}
