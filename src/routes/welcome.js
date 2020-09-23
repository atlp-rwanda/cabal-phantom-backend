import express from 'express';
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//swagger
const swaggerrOptions = {
    swaggerDefinition: {
        info: {
        version: "1.0.0", 
        title:"Public API",
        description: `Api Information`,
        contact:{
            name: `Cabal Team`
        },
        servers:[`http://localhost:2301`]
    }
},
//or others API like ['./routes/*.js']
    apis:['src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerrOptions);
app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs));
//routes
/**
 * @swagger
 * /:
 *  get:
 *    description: Use to respond welcome message
 *    responses:
 *      '201':
 *        description: A successful response
 */ 
app.get('/',(req,res)=>res.send('Welcome to our phantom beginning'));
export default app;