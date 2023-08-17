const express = require('express');
const cors = require('cors')

const { dbConnection } = require('../database/config')
const { defaultUser } = require('../controllers/usuario')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            registros: '/universidad/evento'
        }

        this.conectarDB();
        this.middlewares();
        this.routes();

        defaultUser()

    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.paths.registros, require('../routes/formulario'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;
