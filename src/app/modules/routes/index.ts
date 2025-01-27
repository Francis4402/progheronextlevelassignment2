import { Router } from "express";
import { BookShopRoutes } from "../books/bookShop_routes";
import { OrderRoutes } from "../orders/bookShopOrder_routes";
import { AuthRoutes } from "../Authentications/Auth/auth_route";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/products',
        route: BookShopRoutes,
    },
    {
        path: '/orders',
        route: OrderRoutes,
    }
]


moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;