import { httpStatus } from "../../../config/status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user_services";


const createUser = catchAsync(async (req, res) => {

    console.log(req.file);
    console.log(req.body);

    const { name, email, phone, address, gender, dateofbirth, password, role } = req.body;

    const payload = {
        name,
        email,
        phone,
        address,
        gender,
        dateofbirth,
        password,
        role,
      };

    const result = await UserServices.createUserIntoDB(req.file, payload);
  
    sendResponse(res, {
      statusCode: httpStatus.SUCCESS,
      success: true,
      message: 'User registered successfully',
      data: result,
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
});

const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getUserByIDDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is fetched successfully',
    data: result,
  });
});

const updateProfilebyId = catchAsync(async (req, res) => {
  const { id } = req.params;

  const { name, email, phone, address, gender, dateofbirth, password, role } = req.body;

  const payload = {
    name,
    email,
    phone,
    address,
    gender,
    dateofbirth,
    password,
    role,
  };


  const result = await UserServices.updateProfilesFromDB(id, payload, req.file);


  sendResponse(res, {
    statusCode: httpStatus.SUCCESS,
    success: true,
    message: 'User updated successfully',
    data: result,
  })

});


export const UserController = {
    createUser, getUsers, updateProfilebyId, getUserById
}