import { z } from "zod";

const bookValidationSchema = z.object({
    title: z.string().max(50, {message: "Title must be less than 50 characters"}),
    author: z.string().max(20, {message: "Author must be less than 20 characters"}),
    price: z.number(),
    category: z.enum(["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"]),
    description: z.string().max(225, {message: "Description must be less than 225 characters"}),
    quantity: z.number(),
    inStock: z.boolean().default(true),
})

const orderValidationSchema = z.object({
    email: z.string(),
    product: z.object({
        _id: z.string(),
        title: z.string(),
        price: z.number(),
    }),
    quantity: z.number(),
    totalPrice: z.number(),
})

export { bookValidationSchema, orderValidationSchema };