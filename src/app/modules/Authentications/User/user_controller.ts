import { httpStatus } from "../../../config/status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user_services";


const createUser = catchAsync(async (req, res) => {

    console.log(req.file);
    console.log(req.body);

    const { name, email, password, role } = req.body;

    const payload = {
        name,
        email,
        password,
        role,
      };

    const result = await UserServices.createUserIntoDB(req.file, payload);
  
    sendResponse(res, {
      statusCode: httpStatus.SUCCESS,
      success: true,
      message: 'User registered successfully',
      data: {
        user: result,
        file: req.file
      },
    });
});


const getUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getUsersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are fetched successfully',
    data: result,
  });
})


export const UserController = {
    createUser, getUsers
}