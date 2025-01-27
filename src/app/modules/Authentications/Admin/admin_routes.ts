import { Router } from "express";
import auth from "../../../middlewares/auth";
import { USER_ROLE } from "../User/user_constant";
import { AdminController } from "./admin_controller";



const router = Router();

router.patch('/users/:id/block', auth([USER_ROLE.admin]), AdminController.updateUserBlocked);

router.patch('/users/:id/admin', auth([USER_ROLE.admin]), AdminController.updateUserRoles);


export const AdminRoutes = router;