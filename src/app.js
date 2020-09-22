
import express from "express";
import welcomeRoute from "./routes/routeWelcome"
import swaggerUiExpress from "swagger-ui-express";
import swaggerOptions from "./utils/swagger";
import swaggerJsDoc from "swagger-jsdoc";


const app = express();

app.use("/phantom-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerJsDoc(swaggerOptions)));

app.use("/",welcomeRoute);

export default app;

