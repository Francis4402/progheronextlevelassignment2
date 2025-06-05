"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/modules/routes"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ['https://bookshopfrontend-eight.vercel.app'], credentials: true }));
app.get('/', (req, res) => {
    res.send('Book Shop Api');
});
app.use('/api', routes_1.default);
app.use((error, req, res, next) => {
    (0, globalErrorhandler_1.default)(error, req, res, next);
});
//Not Found
app.use((req, res, next) => {
    (0, notFound_1.default)(req, res, next);
});
exports.default = app;
