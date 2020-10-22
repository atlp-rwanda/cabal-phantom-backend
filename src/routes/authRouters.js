import express from "express";
const router = express()
import userController from '../controller/userControllers'
import protectMiddleware from '../middleware/protectRoutes'
import roleValidator from '../validation/roleValidation'
import checkEmailExists from '../middleware/checkEmailExist'
import userValidation from "../validation/userValidation";

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
router.post('/login', userController.logIn)

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
    userValidation.userValidate,
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
    roleValidator.roleValidate,
    checkEmailExists.checkIfEmailExists,
    userController.updateUser
)

export default router;
