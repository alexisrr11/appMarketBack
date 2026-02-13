import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

export class App {
  constructor(port = process.env.PORT || 3000) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/api', routes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto: ${this.port}`);
    });
  }
}
