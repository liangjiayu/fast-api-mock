import { z } from '@hono/zod-openapi';
import { createPaginatedResponse } from '../../common/schema';

export const ProductSchema = z
  .object({
    id: z.number().openapi({ description: '商品ID', example: 1 }),
    name: z.string().openapi({ description: '商品名称', example: '无线蓝牙耳机' }),
    price: z.number().openapi({ description: '价格', example: 299.0 }),
    description: z.string().openapi({ description: '商品描述', example: '高品质无线蓝牙耳机，支持降噪' }),
    image: z.string().url().openapi({ description: '商品图片', example: 'https://picsum.photos/seed/product1/200/200' }),
  })
  .openapi('Product');

export const ProductListResponseSchema = createPaginatedResponse(ProductSchema).openapi('ProductListResponse');
