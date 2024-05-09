import express from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import _ from "lodash";
import chalk from "chalk";
moment.locale("es");

const routes = express.Router();
const users = [];


routes.get("/usuarios", async(req, res)=>{
    try { 
        const consulta = await axios.get("https://randomuser.me/api/");
        const usuario = consulta.data.results[0];
        const {first, last} = usuario.name;
        const {gender} = usuario;
        const id = uuidv4().slice(0, 8);
        const timestamp = moment().format("MMMM Do YYYY, hh:mm a");

       
        users.push({first, last, gender, id, timestamp});
        const [mujeres, hombres] = _.partition(users, {gender: "female"});
        const template = `
        <h5>Mujeres:</h5><ol>
        ${mujeres.map(e=>`<li>Nombre:${e.first} - Apellido: ${e.last} - Genero: ${e.gender} - Id: ${e.id} - Time: ${e.timestamp}</li>`)}
        </ol>
        <h5>Hombres:</h5><ol>
        ${hombres.map(e=>`<li>Nombre:${e.first} - Apellido: ${e.last} - Genero: ${e.gender} - Id: ${e.id} - Time: ${e.timestamp}</li>`)}
        </ol>
        `
        console.log(chalk.blue.bgWhite("- Listado de Usuarios -"));
        console.log(chalk.blue.bgWhite(template));
        res.send(template);
        } catch (error) {
        console.log(error)
    }
})

export default routes;