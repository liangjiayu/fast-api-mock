import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { z } from 'zod'

const UserSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    username: z.string().openapi({ example: 'testuser' }),
    email: z.string().email().openapi({ example: 'testuser@example.com' }),
    firstName: z.string().openapi({ example: 'Test' }),
    lastName: z.string().openapi({ example: 'User' }),
  })
  .openapi('User')

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

// Route definitions
const getUserRoute = createRoute({
  method: 'get',
  path: '/api/user',
  responses: {
    200: {
      description: 'User information',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
  },
})

const getProductsRoute = createRoute({
  method: 'get',
  path: '/api/products',
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

const app = new OpenAPIHono()

app.get('/', (c) => {
  return c.text('Welcome to the Fast API Mock. Visit /ui for API documentation.')
})

// Endpoints
app.openapi(getUserRoute, (c) => {
  const userInfo = {
    id: 1,
    username: 'testuser',
    email: 'testuser@example.com',
    firstName: 'Test',
    lastName: 'User',
  }
  return c.json(userInfo)
})

app.openapi(getProductsRoute, (c) => {
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
})

// Swagger UI
app.get('/ui', swaggerUI({ url: '/doc' }))

// OpenAPI Spec
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Fast API Mock',
  },
})


export default app
