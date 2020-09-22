
import express from "express";
const app=express();

app.use(express.json());
const welcomeRoute= require("./routes/welcome");
app.use("/",welcomeRoute);


const PORT =process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))