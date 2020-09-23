import path from "path";

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Phantom API",
        description: "Phantom API Information",
        contact: {
          name: "Phantom project documentation"
        },
        servers: ["http://localhost:5000"]
      }
    },
  
    // eslint-disable-next-line no-undef
    apis: [path.resolve(__dirname,'../routes/*.js')]
  };

  export default swaggerOptions;