export class UserModel {
  constructor(db) {
    this.db = db;
  }

  async create({ email, passwordHash }) {
    const query = `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING id, email, created_at
    `;

    const values = [email, passwordHash];
    const { rows } = await this.db.query(query, values);
    return rows[0];
  }

  async findByEmail(email) {
    const query = `
      SELECT id, email, password_hash, created_at
      FROM users
      WHERE email = $1
      LIMIT 1
    `;

    const { rows } = await this.db.query(query, [email]);
    return rows[0] ?? null;
  }

  async findById(id) {
    const query = `
      SELECT id, email, created_at
      FROM users
      WHERE id = $1
      LIMIT 1
    `;

    const { rows } = await this.db.query(query, [id]);
    return rows[0] ?? null;
  }
}
