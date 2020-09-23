
import express from "express";
const app=express();
import routes from "./routes/index";
import welcomeRoute from "./routes/welcome"

app.use(express.json());
app.use(routes)

app.use("/welcomes",welcomeRoute);


// eslint-disable-next-line no-undef
const PORT =process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))