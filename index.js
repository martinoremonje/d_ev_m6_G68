import express from "express";
import routes from "./routes/routes.js";


const app = express();
const PORT = process.env.PORT || 3000;

//Rutas

app.use("/", routes);

app.listen(PORT, ()=>{
    console.log(`Servidor activo en el puerto: http://localhost:${PORT}`)
});
