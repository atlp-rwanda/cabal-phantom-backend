
import express from "express";
import welcomeRoute from "./routes/routeWelcome"
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "../swagger.json";


const app = express();

app.use('/phantom-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

app.use("/",welcomeRoute);

export default app;

