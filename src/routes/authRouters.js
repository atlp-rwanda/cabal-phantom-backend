import express from "express";
const router = express()
import userController from '../controller/userControllers'
import protectMiddleware from '../middleware/protectRoutes'
import checkEmailExists from '../middleware/checkEmailExist'
//import userValidation from "../validation/userValidation";
import validators from '../validation/index'

const {logInChecker,resetPassword,sendEmailChecker,roleValidate,userValidate} = validators;

/** 
 * @swagger
 * 
 * /api/v1/auth/login:
 *  post: 
 *   summary: Log in 
 *   description: Log in
 *   tags: 
 *   - User
 *   parameters: 
 *   - in: body
 *     name: Bus
 *     description: Enter your email and password
 *     schema: 
 *       type: object 
 *       properties:
 *        email: 
 *         type: string
 *        password: 
 *         type: string
 *   responses:
 *    201: 
 *     description: Login Successfully
 *    401: 
 *     description: Invalid email and password 
 */
router.post('/login',logInChecker,userController.logIn)

/** 
 * @swagger
 * 
 * /api/v1/auth/register:
 *  post: 
 *   summary: Sign up 
 *   description: Register user
 *   tags: 
 *   - User
 *   parameters: 
 *   - in: header 
 *     name: Authorization
 *     required: true
 *     type: string
 *     description: token to authorize
 *   - in: body
 *     name: Bus
 *     description: Register new user
 *     schema: 
 *       type: object 
 *       properties:
 *        name: 
 *         type: string
 *        email: 
 *         type: string
 *        birthdate:
 *         type: string
 *         format: date
 *        gender: 
 *         type: string
 *   responses:
 *    201: 
 *     description: registered Successfully
 *    400: 
 *     description: Invalid inputs
 */
router.post(
    '/register',
    protectMiddleware.protect,
    protectMiddleware.restrictTo('admin'),
    userValidate, 
    userController.createUser
    )
/** 
 * @swagger
 * 
 * /api/v1/auth:
 *  get: 
 *    summary: Get all users
 *    description: Return all users
 *    tags:
 *    - User
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    responses: 
 *     200: 
 *      description: Retrieved Successfully
 */

router.get(
    '/',
    protectMiddleware.protect,
    protectMiddleware.restrictTo('admin'),
    userController.getAllUsers
)

/** 
 * @swagger
 * 
 * /api/v1/auth/updateuser:
 *  patch: 
 *   summary: Assign role to the user 
 *   description: Assign role to the user
 *   tags: 
 *   - User
 *   parameters: 
 *   - in: header 
 *     name: Authorization
 *     required: true
 *     type: string
 *     description: token to authorize
 *   - in: body
 *     name: User
 *     description: Assign role to the user
 *     schema: 
 *       type: object 
 *       properties:
 *        email: 
 *         type: string
 *        role: 
 *         type: string
 *   responses:
 *    200: 
 *     description: Updated Successfully
 *    400: 
 *     description: Invalid inputs
 *    404:
 *     description: Email not found
 */

router.patch(
    '/updateuser',
    protectMiddleware.protect,
    protectMiddleware.restrictTo('admin'),
    roleValidate,
    checkEmailExists,
    userController.updateUser
)

/** 
 * @swagger
 * 
 * /api/v1/auth/forgetPassword:
 *  post: 
 *   summary: Forget password 
 *   description: Send email with reset password link
 *   operationId: Send link
 *   tags: 
 *   - User
 *   parameters: 
 *   - in: body
 *     name: User
 *     description: Email to send on link
 *     schema: 
 *       type: object 
 *       properties:
 *        email: 
 *         type: string
 *         example: "example@yahoo.fr"
 *   produces: application/json
 *   responses:
 *    200: 
 *     description: Reset password is successfully
 *    400: 
 *     description: invalid input
 *    404: 
 *     description: unauthorized user
 */
router.post('/forgetPassword',sendEmailChecker,userController.forgetPassword)

/** 
 * @swagger
 * 
 * /api/v1/auth/resetPassword/{token}:
 *  put: 
 *   summary: Reset password 
 *   description: Resetting password and you may use it later in login
 *   operationId: Password reset
 *   tags: 
 *   - User
 *   parameters: 
 *   - in: path
 *     name: token
 *     required: true
 *     type: string
 *     description: token provided in link
 *   - in: body
 *     name: User
 *     description: provide password and confimPassword to reset password
 *     schema: 
 *       type: object 
 *       properties:
 *        password: 
 *         type: string,
 *         example: "*********"
 *        confirmPassword: 
 *         type: string
 *         example: "*********"
 *   produces: application/json
 *   responses:
 *    200: 
 *     description: Email send successfully
 *    400: 
 *     description: invalid input
 *    404: 
 *     description: unauthorized user
 */
router.put('/resetPassword/:token',resetPassword,userController.resetPassword)


export default router;
