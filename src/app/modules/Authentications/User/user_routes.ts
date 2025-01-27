import { Router } from "express";
import auth from "../../../middlewares/auth";
import { USER_ROLE } from "./user_constant";
import validateRequest from "../../../middlewares/validateRequest";
import { UserValidation } from "./user_validation";
import { UserController } from "./user_controller";



const router = Router();

router.get('/', auth([USER_ROLE.admin]), validateRequest(UserValidation.userValidationSchema), UserController.getUsers);

export const UserRoutes = router;