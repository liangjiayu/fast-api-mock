import type { RouteHandler } from '@hono/zod-openapi';
import type { GetProductsRoute } from './product.route';

const products = [
  { id: 1, name: '无线蓝牙耳机', price: 299.0, description: '高品质无线蓝牙耳机，支持降噪', image: 'https://picsum.photos/seed/product1/200/200' },
  { id: 2, name: '机械键盘', price: 599.0, description: 'Cherry轴机械键盘，RGB背光', image: 'https://picsum.photos/seed/product2/200/200' },
  { id: 3, name: '便携显示器', price: 1299.0, description: '15.6英寸便携显示器，4K分辨率', image: 'https://picsum.photos/seed/product3/200/200' },
  { id: 4, name: '智能手表', price: 899.0, description: '多功能智能手表，健康监测', image: 'https://picsum.photos/seed/product4/200/200' },
  { id: 5, name: '移动电源', price: 149.0, description: '20000mAh大容量移动电源', image: 'https://picsum.photos/seed/product5/200/200' },
  { id: 6, name: 'USB-C扩展坞', price: 399.0, description: '多接口USB-C扩展坞', image: 'https://picsum.photos/seed/product6/200/200' },
  { id: 7, name: '降噪耳塞', price: 199.0, description: '入耳式主动降噪耳塞', image: 'https://picsum.photos/seed/product7/200/200' },
  { id: 8, name: '无线鼠标', price: 249.0, description: '人体工学无线鼠标', image: 'https://picsum.photos/seed/product8/200/200' },
  { id: 9, name: '平板支架', price: 89.0, description: '可调节铝合金平板支架', image: 'https://picsum.photos/seed/product9/200/200' },
  { id: 10, name: '数据线套装', price: 59.0, description: 'USB-C数据线三合一套装', image: 'https://picsum.photos/seed/product10/200/200' },
  { id: 11, name: '桌面台灯', price: 199.0, description: 'LED护眼台灯，色温可调', image: 'https://picsum.photos/seed/product11/200/200' },
  { id: 12, name: '笔记本散热器', price: 129.0, description: '静音散热底座，双风扇', image: 'https://picsum.photos/seed/product12/200/200' },
  { id: 13, name: '蓝牙音箱', price: 349.0, description: '防水便携蓝牙音箱', image: 'https://picsum.photos/seed/product13/200/200' },
  { id: 14, name: '电脑包', price: 179.0, description: '15.6英寸笔记本双肩包', image: 'https://picsum.photos/seed/product14/200/200' },
  { id: 15, name: '屏幕挂灯', price: 219.0, description: '显示器护眼挂灯', image: 'https://picsum.photos/seed/product15/200/200' },
];

export const getProductsHandler: RouteHandler<typeof GetProductsRoute> = (c) => {
  const { page: pageStr, pageSize: pageSizeStr } = c.req.valid('query');
  const page = Number(pageStr);
  const pageSize = Number(pageSizeStr);
  const start = (page - 1) * pageSize;
  const data = products.slice(start, start + pageSize);

  return c.json({
    data,
    total: products.length,
    page,
    pageSize,
  });
};
