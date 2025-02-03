import { z } from 'zod';

const bookValidationSchema = z
  .object({
    product_id: z.string(),
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
    email: z.string().email(),
    product: z.string(),
    quantity: z.number().min(1),
    totalPrice: z.number().min(1),
  })

export { bookValidationSchema, orderValidationSchema };
