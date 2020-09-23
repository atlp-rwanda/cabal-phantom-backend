import {Router} from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import swaggerOptions from "../utils/swagger";
import welcomeRoute from "./welcome"


const router=Router();
const swaggerDocs = swaggerJsDoc(swaggerOptions);
  router.use("/phantom-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));

  router.use(welcomeRoute);

export default router; 