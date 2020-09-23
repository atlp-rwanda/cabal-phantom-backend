import app from './routes/welcome';
const port = process.env.port || 2301;
app.listen(port,() => {console.log(`server is live on ${port}`)})