import { model, Schema } from "mongoose";
import { Book, BookShopModel, Order, OrderShopModel } from "./books/bookShop_interfaces";



const bookSchema = new Schema<Book, BookShopModel>({
    title: {type: String, required: [true, 'Title is required'], unique: true},
    author: {type: String, required: [true, 'Author is required']},
    price: {type: Number, required: [true, 'Price is required']},
    category: {type: String, required: [true, 'Category is required']},
    description: {type: String, required: [true, 'Description is required']},
    quantity: {type: Number, required: [true, 'Quantity is required']},
    inStock: {type: Boolean, required: [true, 'InStock is required']},
});

const orderSchema = new Schema<Order, OrderShopModel>({
    email: {type: String, required: [true, 'Email is required']},
    product: {type: Schema.Types.ObjectId, required: [true, 'Product is required']},
    quantity: {type: Number, required: [true, 'Quantity is required']},
    totalPrice: {type: Number, required: [true, 'TotalPrice is required']},
    createdAt: {type: Date, required: [true, 'CreatedAt is required']},
    updatedAt: {type: Date, required: [true, 'UpdatedAt is required']},
})

bookSchema.methods.isUserExists = async function (id: string) {
    const existingUser = await Books.findOne({_id: id});
    return existingUser;
}

orderSchema.methods.isOrderExists = async function (id: string) {
    const existingOrder = await Orders.findOne({_id: id});
    return existingOrder;
}

export const Books = model<Book, BookShopModel>("Book", bookSchema);

export const Orders = model<Order, OrderShopModel>("Order", orderSchema);