import { z } from '@hono/zod-openapi';

export const CurrentUserSchema = z
  .object({
    name: z.string().openapi({ description: '用户姓名', example: 'Serati Ma' }),
    avatar: z.string().url().openapi({ description: '头像', example: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' }),
    userid: z.string().openapi({ description: '用户ID', example: '00000001' }),
    email: z.string().email().openapi({ description: '邮箱', example: 'antdesign@alipay.com' }),
    signature: z.string().openapi({ description: '个性签名', example: '海纳百川，有容乃大' }),
    title: z.string().openapi({ description: '职位', example: '交互专家' }),
    group: z.string().openapi({ description: '所属部门', example: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED' }),
    notifyCount: z.number().openapi({ description: '通知数量', example: 12 }),
    unreadCount: z.number().openapi({ description: '未读消息数量', example: 11 }),
    country: z.string().openapi({ description: '国家', example: 'China' }),
    address: z.string().openapi({ description: '地址', example: '西湖区工专路 77 号' }),
    phone: z.string().openapi({ description: '联系电话', example: '0752-268888888' }),
  })
  .openapi('CurrentUser');
