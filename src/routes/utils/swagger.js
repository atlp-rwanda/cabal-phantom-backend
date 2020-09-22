import path from "path";
import os from "os";

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Phantom API",
        description: "Phantom API Information",
        contact: {
          name: "Phantom project documentation"
        },
      servers: [
        {
          url: 'http://localhost:5000',
          name: `localhost`
        },
        {
          url: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`,
          name: `${os.hostname()}`
        }
  
      ]
      }
    },
  
    apis: [path.resolve(__dirname,'../routes/*.js')]
  };

  export default swaggerOptions;

