import busController from '../controller/busControllers'
import busValidation from '../validation/busValidation'
import checkExist from '../middleware/checkExist'
import protectMiddleware from '../middleware/protectRoutes'
import express from "express"
import sendEmailChecker from '../validation/sendEmailValidation'

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
 *        type: 
 *         type: string
 *        location: 
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
 * /api/v1/buses/assignedbuses?page={page}&limit={limit}:
 *  get: 
 *    summary: Get assigned bus by page and limit
 *    description: Retrieve assigned bus by page and limit
 *    tags:
 *    - Assign driver to bus
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
router.get(
    '/assignedbuses',
    protectMiddleware.protect,
    protectMiddleware.restrictTo('operator', 'admin'),
    busController.getAssignedBuses
)

     /** 
 * @swagger
 * 
 * /api/v1/buses/route?origin={origin}&destination={destination}:
 *  get: 
 *   summary: View a list of buses in route
 *   description: View Buses in your route
 *   tags: 
 *   - Bus
 *   parameters: 
 *    - in: query
 *      name: origin
 *      required: true
 *      type: string
 *      default: Kimironko
 *      description: Enter you origin
 *    - in: query
 *      name: destination
 *      required: true
 *      type: string
 *      default: Nyabugogo
 *      description: Enter you destination
 *   responses:
 *    200: 
 *     description: Retreaving Buses in  your route Successfully
 *    401:
 *     description: Unauthorized
 *    400: 
 *     description: Invalid inputs
 *    500: 
 *     description: Incorrect information 
 */

router
    .route('/route')
    .get(
        busValidation.viewBusValidation,
        checkExist.checkRouteExist,
        busController.viewListOfBuses
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
 *        plate: 
 *         type: string
 *        company: 
 *         type: string
 *        seats: 
 *         type: integer
 *        status: 
 *         type: string
 *        type: 
 *         type: string
 *        location: 
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
        checkExist.checkBusID,
        busController.getBus
    )
    .patch(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('operator', 'admin'),
        checkExist.checkBusID,
        busValidation.busValidate,
        checkExist.checkPlate,
        busController.updateBus
    )
    .delete(
        protectMiddleware.protect,
        protectMiddleware.restrictTo('operator', 'admin'),
        checkExist.checkBusID,
        busController.deleteBus
    )
/** 
 * @swagger
 * 
 * /api/v1/buses/assigndriver/{id}:
 *  patch: 
 *    summary: Assign driver to bus
 *    description: Return assigned bus
 *    tags:
 *    - Assign driver to bus
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
 *      description: Enter email of driver to be assigned to bus
 *      schema: 
 *       type: object 
 *       properties:
 *        email: 
 *         type: string
 *    responses: 
 *     200: 
 *      description: Assigned Successfully
 */
    
router.patch(
    '/assigndriver/:id',
    protectMiddleware.protect,
    protectMiddleware.restrictTo('operator', 'admin'),
    sendEmailChecker,
    checkExist.ckeckUserEmail,
    checkExist.checkRole,
    checkExist.checkDriverAssigned,
    checkExist.checkBusID,
    checkExist.checkAssigned,
    busController.assignDriver
 )

/** 
 * @swagger
 * 
 * /api/v1/buses/unassigndriver/{id}:
 *  patch: 
 *    summary: Unassign driver to bus
 *    description: Return unassigned bus
 *    tags:
 *    - Assign driver to bus
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
 *      description: Enter email of driver to be unassigned to bus
 *      schema: 
 *       type: object 
 *       properties:
 *        email: 
 *         type: string
 *    responses: 
 *     200: 
 *      description: Unassigned Successfully
 */

 router.patch(
    '/unassigndriver/:id',
    sendEmailChecker,
    protectMiddleware.protect,
    protectMiddleware.restrictTo('operator', 'admin'),
    checkExist.ckeckUserEmail,
    checkExist.checkAssignment,
    busController.unassignDriver
 )
 


export default router;

