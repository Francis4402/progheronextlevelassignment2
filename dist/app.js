"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const bookShop_routes_1 = require("./modules/bookShop_routes");
const bookShopOrder_routes_1 = require("./modules/bookShopOrder_routes");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/products', bookShop_routes_1.BookShopRoutes);
app.use('/api/orders', bookShopOrder_routes_1.OrderRoutes);
app.get('/', (req, res) => {
    res.send({ Title: 'Programming Hero Next Level Assignment 2 (Book-Shop)', Name: 'Prithvy Francis Manda', Batch: '4', StudentID: 'WEB8-1601' });
});
exports.default = app;
