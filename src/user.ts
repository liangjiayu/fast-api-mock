import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { Context } from 'hono'

// Schema
const UserSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    username: z.string().openapi({ example: 'testuser' }),
    email: z.string().email().openapi({ example: 'testuser@example.com' }),
    firstName: z.string().openapi({ example: 'Test' }),
    lastName: z.string().openapi({ example: 'User' }),
  })
  .openapi('User')

// Route
export const getUserRoute = createRoute({
  method: 'get',
  path: '/api/user',
  operationId: 'getUser',
  tags: ['User'],
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

// Handler
export const getUser = (c: Context) => {
  const userInfo = {
    id: 1,
    username: 'testuser',
    email: 'testuser@example.com',
    firstName: 'Test',
    lastName: 'User',
  }
  return c.json(userInfo)
}
