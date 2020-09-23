import welcomeController from "../contollers/welcome";
import express from "express";

const router = express.Router();

router.route("/").get(welcomeController.getWelcome)

export default router