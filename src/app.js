import express from "express";
import i18n from 'i18n'
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import userRoute from './routes/userRouters';

const app = express();
app.use(express.json())

i18n.configure({
    locales: ['en', 'fr', 'rw'],
    header: 'accept-language',
    extension: '.json',
    queryParameter: 'lang',
    directoryPermissions: '755',
    autoReload: true,
    directory: __dirname + '/../locales'
});

app.use(i18n.init)
app.use('/phantom-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));
app.use("/api/v1/users",userRoute)
app.get('/', (req, res) => {
    res.status(200).json({
        message: res.__('welcome')
    })
})

app.all('*', (req, res) => {
    res.status(404).json({
        message: res.__("404")
    })
})
export default app;
