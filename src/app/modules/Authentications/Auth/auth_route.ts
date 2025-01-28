import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { UserValidation } from "../User/user_validation";
import { AuthController } from "./auth_controller";
import { UserController } from "../User/user_controller";
import { upload } from "../../../utils/sendImagetocloud";


const router = Router();

router.post('/login', validateRequest(UserValidation.userValidationSchema), AuthController.loginUser)

router.post('/register', upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
},
    validateRequest(UserValidation.userValidationSchema), 
    UserController.createUser
);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;