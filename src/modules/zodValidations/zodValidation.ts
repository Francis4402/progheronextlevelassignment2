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
      'SelfDevelopment',
      'Poetry',
      'Religious',
    ]),
    description: z
      .string()
      .max(225, { message: 'Description must be less than 225 characters' }),
    quantity: z.number(),
    inStock: z.boolean().default(true),
  })
  .extend({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

const orderValidationSchema = z
  .object({
    email: z.string().email(),
    product: z.string(),
    quantity: z.number().min(1),
    totalPrice: z.number().min(1),
  })
  .extend({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });

export { bookValidationSchema, orderValidationSchema };
