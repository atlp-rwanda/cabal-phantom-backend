import welcomeController from "../contollers/welcome";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */

router.route("/").get(welcomeController.getWelcome)

export default router