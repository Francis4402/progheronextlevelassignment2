import { Router } from "express";
import { BookShopRoutes } from "../books/bookShop_routes";
import { OrderRoutes } from "../orders/bookShopOrder_routes";
import { AuthRoutes } from "../Authentications/Auth/auth_route";
import { UserRoutes } from "../Authentications/User/user_routes";


const router = Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/auth/users',
        route: UserRoutes,
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