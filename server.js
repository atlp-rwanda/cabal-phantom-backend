import dotenv from 'dotenv'
import app from "./src/app";
dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`))

