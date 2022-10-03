import express from "express"
import cors from "cors"
import {dbConnection} from "../database/config.js"
import usuario from "../routes/usuario.js"
import ensayo from "../routes/ensayo.js"
import ciudad from "../routes/ciudad.js"
import muestra from "../routes/muestra.js"
import orden from "../routes/orden_servicio.js"
import setup from "../routes/setup.js"
import tipo_muestra from "../routes/tipo_muestra.js"
import servicio from "../routes/servicio.js"

class Server {



    
    constructor() {
        this.app=express()
        this.middleware()
        this.port=process.env.PORT
        this.conectarBd()
        this.routes()
    }
    routes () {
        this.app.use('/api/usuario',usuario)
        this.app.use('/api/ensayo',ensayo)
        this.app.use('/api/ciudad',ciudad)
        this.app.use('/api/muestra',muestra)
     
        
        this.app.use('/api/orden',orden)
        this.app.use('/api/setup',setup)
       this.app.use('/api/tipomuestra',tipo_muestra)
       this.app.use('/api/servicio',servicio)
    }

    async conectarBd(){
        await dbConnection()
    }

    middleware () {
        this.app.use(express.json())
        this.app.use(cors())
    }

    escuchar () {
        this.app.listen(this.port, ()=>{
            console.log(`servidor escuchando en el puerto ${this.port}`);
        })
    }
}

export default Server