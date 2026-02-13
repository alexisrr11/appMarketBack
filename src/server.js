import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

dotenv.config();

export class App {
  constructor(port = process.env.PORT || 3000) {
    this.app = express();
    this.port = port;

    this.middlewares();
    this.routes();
    this.errorMiddlewares();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.get('/api', (_req, res) => {
      res.json({
        success: true,
        message: 'API backend de lista de supermercado',
      });
    });

    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/products', productRoutes);
  }

  errorMiddlewares() {
    this.app.use(errorHandler);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto: ${this.port}`);
    });
  }
}
