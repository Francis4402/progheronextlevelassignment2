"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/modules/routes"));
const globalErrorhandler_1 = __importDefault(require("./app/middlewares/globalErrorhandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
app.get('/', (req, res) => {
    res.send('Hello PH Team');
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
