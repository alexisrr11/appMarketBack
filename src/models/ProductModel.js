export class ProductModel {
  constructor(db) {
    this.db = db;
  }

  async create({ name, quantity, createdBy }) {
    const query = `
      INSERT INTO products (name, quantity, created_by)
      VALUES ($1, $2, $3)
      RETURNING id, name, quantity, completed, created_by, created_at, updated_at
    `;

    const values = [name, quantity, createdBy];
    const { rows } = await this.db.query(query, values);
    return rows[0];
  }

  async findAll() {
    const query = `
      SELECT id, name, quantity, completed, created_by, created_at, updated_at
      FROM products
      ORDER BY created_at DESC
    `;

    const { rows } = await this.db.query(query);
    return rows;
  }

  async findById(id) {
    const query = `
      SELECT id, name, quantity, completed, created_by, created_at, updated_at
      FROM products
      WHERE id = $1
      LIMIT 1
    `;

    const { rows } = await this.db.query(query, [id]);
    return rows[0] ?? null;
  }

  async update({ id, name, quantity, completed }) {
    const query = `
      UPDATE products
      SET name = $1,
          quantity = $2,
          completed = $3,
          updated_at = NOW()
      WHERE id = $4
      RETURNING id, name, quantity, completed, created_by, created_at, updated_at
    `;

    const values = [name, quantity, completed, id];
    const { rows } = await this.db.query(query, values);
    return rows[0] ?? null;
  }

  async delete(id) {
    const query = 'DELETE FROM products WHERE id = $1';
    await this.db.query(query, [id]);
  }
}
