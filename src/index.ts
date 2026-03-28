import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { getUser, getUserRoute } from './user'
import { getProducts, getProductsRoute } from './product'

const app = new OpenAPIHono()

app.get('/', (c) => {
  return c.text('Welcome to the Fast API Mock. Visit /ui for API documentation.')
})

// Endpoints
app.openapi(getUserRoute, getUser)
app.openapi(getProductsRoute, getProducts)

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
