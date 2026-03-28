import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono123!')
})

// 1. User Information API
app.get('/api/user', (c) => {
  const userInfo = {
    id: 1,
    username: 'testuser',
    email: 'testuser@example.com',
    firstName: 'Test',
    lastName: 'User',
  }
  return c.json(userInfo)
})

// 2. Get Product List API
app.get('/api/products', (c) => {
  const products = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 50,
  }));

  const page = parseInt(c.req.query('page') || '1', 10);
  const pageSize = parseInt(c.req.query('pageSize') || '10', 10);

  const total = products.length;
  const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

  return c.json({
    data: paginatedProducts,
    total,
    page,
    pageSize,
  });
});

export default app
