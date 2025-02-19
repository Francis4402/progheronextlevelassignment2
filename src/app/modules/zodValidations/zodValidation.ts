import { z } from 'zod';

const bookValidationSchema = z
  .object({
    title: z
      .string()
      .max(50, { message: 'Title must be less than 50 characters' }),
    author: z
      .string()
      .max(20, { message: 'Author must be less than 20 characters' }),
    price: z.number(),
    category: z.enum([
      'Fiction',
      'Science',
      'SoftwareDevelopment',
      'Poetry',
      'Story',
    ]),
    description: z
      .string()
      .max(225, { message: 'Description must be less than 225 characters' }),
    quantity: z.number(),
    inStock: z.boolean().default(true),
})

const orderValidationSchema = z
  .object({
    user: z.any(),
    product: z.any(),
    quantity: z.number(),
    totalPrice: z.number(),
    status: z.enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled']),
})

export { bookValidationSchema, orderValidationSchema };
