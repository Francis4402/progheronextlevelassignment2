import { httpStatus } from "../../../config/status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { adminServices } from "./admin_services";


const updateUserRoles = catchAsync(async (req, res) => {
    const {id} = req.params;
    
    const result = await adminServices.updateUserRolesDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User Role is updated successfully',
        data: result,
    })
});

const updateUserBlocked = catchAsync(async (req, res) => {
    const {id} = req.params;

    const result = await adminServices.updateUserBlockedFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User blocked successfully',
        data: result,
    })
});


export const AdminController = {
    updateUserBlocked, updateUserRoles
}