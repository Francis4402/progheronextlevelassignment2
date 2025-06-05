import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { UserValidation } from "./user_validation";
import { UserController } from "./user_controller";
import { upload } from "../../../utils/sendImagetocloud";



const router = Router();

router.get('/', validateRequest(UserValidation.userValidationSchema), UserController.getUsers);

router.put('/:id', upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
}, validateRequest(UserValidation.userValidationSchema), UserController.updateProfilebyId);

router.get('/:id', validateRequest(UserValidation.userValidationSchema), UserController.getUserById);

export const UserRoutes = router;