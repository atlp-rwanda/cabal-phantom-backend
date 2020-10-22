import busController from '../controller/busControllers'
import busValidation from '../validation/busValidation'
import checkExist from '../middleware/checkExist'
import protectMiddleware from '../middleware/protectRoutes'
import express from "express"

const router = express()

/** 
 * @swagger
 * 
 * /api/v1/buses:
 *  post: 
 *   summary: Create New Bus 
 *   description: Create new bus in system
 *   tags: 
 *   - Bus
 *   parameters: 
 *   - in: header 
 *     name: Authorization
 *     required: true
 *     type: string
 *     description: token to authorize
 *   - in: body
 *     name: Bus
 *     description: Enter bus details
 *     schema: 
 *       type: object 
 *       properties:
 *        plate: 
 *         type: string
 *        company: 
 *         type: string
 *        seats: 
 *         type: integer
 *        status: 
 *         type: string
 *   responses:
 *    201: 
 *     description: Created Successfully
 *   
 *  get: 
 *    summary: Get first 10 bus
 *    description: Retrieve 10 buses by default
 *    tags:
 *    - Bus
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    responses: 
 *     200: 
 *      description: Retrieved Successfully
 * /api/v1/buses?page={page}&limit={limit}:
 *  get: 
 *    summary: Get bus by page and limit
 *    description: Retrieve bus by page and limit
 *    tags:
 *    - Bus
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    - in: path
 *      name: page
 *      required: true
 *      type: integer
 *      default: 1
 *      description: Enter page number
 *    - in: path
 *      name: limit
 *      required: true
 *      type: integer
 *      default: 10
 *      description: Enter limit number of buses per page
 *    responses: 
 *     200: 
 *      description: Retrieved Successfully
 */

router
    .route('/')
    .get(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('operator', 'admin'),
        busController.getAllBus
    )
    .post(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('operator', 'admin'),
        busValidation.busValidate,
        checkExist.checkPlate,
        busController.createNewBus
    )

/** 
 * @swagger
 * 
 * /api/v1/buses/{id}:
 *  get: 
 *    summary: Get bus by id
 *    description: Retrieve bus by id
 *    tags:
 *    - Bus
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter bus id
 *    responses: 
 *     200: 
 *      description: Retrieved Successfully
 *     404: 
 *      description: ID Not Found
 *  patch: 
 *    summary: update existing bus
 *    description: Return updated bus
 *    tags:
 *    - Bus
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter bus id
 *    - in: body
 *      name: Bus
 *      description: Enter bus details
 *      schema: 
 *       type: object 
 *       properties:
 *        company: 
 *         type: string
 *        seats: 
 *         type: integer
 *        status: 
 *         type: string
 *    responses: 
 *     200: 
 *      description: updated Successfully
 *     400: 
 *      description: Invalid Input
 *  delete: 
 *    summary: delete existing bus
 *    description: delete bus
 *    tags:
 *    - Bus
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter bus id
 *    responses: 
 *     200: 
 *      description: Delete Successfully
 */

router
    .route('/:id')
    .get(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('driver', 'operator', 'admin'),
        checkExist.checkID,
        busController.getBus
    )
    .patch(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('operator', 'admin'),
        checkExist.checkID,
        busValidation.updateBusValidate,
        busController.updateBus
    )
    .delete(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('operator', 'admin'),
        checkExist.checkID,
        busController.deleteBus
    )

export default router
