import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { ProductController } from '../controllers/product.controller.js';
import { ProductService } from '../services/product.service.js';
import { ProductModel } from '../models/ProductModel.js';
import { pool } from '../config/db.js';

const router = Router();

const productModel = new ProductModel(pool);
const productService = new ProductService(productModel);
const productController = new ProductController(productService);

router.use(verifyToken);

router.post('/', productController.create);
router.get('/', productController.list);
router.patch('/:id', productController.update);
router.patch('/:id/completed', productController.markCompleted);
router.delete('/:id', productController.remove);

export default router;
