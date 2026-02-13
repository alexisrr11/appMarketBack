export class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  create = async (req, res, next) => {
    try {
      const product = await this.productService.createProduct(req.body, req.user.id);
      res.status(201).json({
        success: true,
        message: 'Producto creado correctamente',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  list = async (_req, res, next) => {
    try {
      const products = await this.productService.listProducts();
      res.status(200).json({
        success: true,
        message: 'Productos obtenidos correctamente',
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const product = await this.productService.editProduct(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Producto editado correctamente',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  markCompleted = async (req, res, next) => {
    try {
      const product = await this.productService.markProductAsCompleted(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Producto marcado como completado',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      await this.productService.deleteProduct(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Producto eliminado correctamente',
      });
    } catch (error) {
      next(error);
    }
  };
}
