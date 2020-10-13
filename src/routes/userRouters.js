import express from "express";
const router = express()
import userController from '../controller/userControllers'
import protectMiddleware from '../middleware/protectRoutes'
import roleValidator from '../validation/roleValidation'
import checkEmailExists from '../middleware/checkEmailExist'

router.post('/login', userController.logIn)

router.get(
    '/',
    protectMiddleware.protect,
    protectMiddleware.restrictTo('admin'),
    userController.getAllUsers
)

router.patch(
    '/updateuser',
    protectMiddleware.protect,
    protectMiddleware.restrictTo('admin'),
    roleValidator.roleValidate,
    checkEmailExists.checkIfEmailExists,
    userController.updateUser
)

export default router;
