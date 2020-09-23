import express from "express"
const router=express.Router();


/**
 * @swagger
 * /:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/',(req,res)=>res.send('Welcome to our phantom beginning'));

export default router;
