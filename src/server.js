import express from 'express';

export class App {
    constructor(PORT=3000){
        this.app = express();
        this.PORT = PORT;

        //Ejecutar middlewares
        this.routes();
        this.middlewares();
    }

    middlewares(){
        this.app.use(express.json());
    };

    routes(){
        this.app.get(("/"), (req, res) => {
            res.send("Hola Node!")
        });
    };

    listen(){
        this.app.listen(this.PORT, ()=> {
            console.log(`Servidor corriendo en puerto: ${this.PORT}`)
        });
    };
}