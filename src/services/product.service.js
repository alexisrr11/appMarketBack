const EDIT_WINDOW_SECONDS = 20;

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async createProduct(payload, createdBy) {
    const name = payload?.name?.trim();
    const quantity = Number(payload?.quantity ?? 1);

    if (!name) {
      throw createError('El nombre del producto es obligatorio', 400);
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw createError('La cantidad debe ser un entero mayor a 0', 400);
    }

    return this.productModel.create({ name, quantity, createdBy });
  }

  async listProducts() {
    return this.productModel.findAll();
  }

  async editProduct(id, payload) {
    const productId = Number(id);
    if (!Number.isInteger(productId) || productId <= 0) {
      throw createError('ID de producto inválido', 400);
    }

    const currentProduct = await this.productModel.findById(productId);
    if (!currentProduct) {
      throw createError('Producto no encontrado', 404);
    }

    this.validateEditWindow(currentProduct);

    const nextName = payload?.name === undefined ? currentProduct.name : payload.name.trim();
    const nextQuantity = payload?.quantity === undefined ? currentProduct.quantity : Number(payload.quantity);

    if (!nextName) {
      throw createError('El nombre del producto es obligatorio', 400);
    }

    if (!Number.isInteger(nextQuantity) || nextQuantity <= 0) {
      throw createError('La cantidad debe ser un entero mayor a 0', 400);
    }

    return this.productModel.updateFields({
      id: productId,
      name: nextName,
      quantity: nextQuantity,
    });
  }

  async markProductAsCompleted(id) {
    const productId = Number(id);
    if (!Number.isInteger(productId) || productId <= 0) {
      throw createError('ID de producto inválido', 400);
    }

    const product = await this.productModel.markCompleted(productId);
    if (!product) {
      throw createError('Producto no encontrado', 404);
    }

    return product;
  }

  async deleteProduct(id) {
    const productId = Number(id);
    if (!Number.isInteger(productId) || productId <= 0) {
      throw createError('ID de producto inválido', 400);
    }

    const deleted = await this.productModel.delete(productId);
    if (!deleted) {
      throw createError('Producto no encontrado', 404);
    }
  }

  validateEditWindow(product) {
    const createdAt = new Date(product.created_at).getTime();
    const updatedAt = new Date(product.updated_at).getTime();
    const reference = Math.max(createdAt, updatedAt);
    const now = Date.now();
    const diffInSeconds = (now - reference) / 1000;

    if (diffInSeconds > EDIT_WINDOW_SECONDS) {
      throw createError('Ya no se puede editar este producto (límite de 20 segundos)', 403);
    }
  }
}
