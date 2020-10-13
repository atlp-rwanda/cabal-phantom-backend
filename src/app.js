import express from "express";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import routes from './routes/index'
import i18n from './language/languageConfig'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())

app.use(i18n.init)
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

app.use(routes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`))

export default app
