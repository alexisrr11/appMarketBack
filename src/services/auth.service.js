import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = 10;

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
    this.jwtSecret = process.env.JWT_SECRET;

    if (!this.jwtSecret) {
      throw new Error('La variable de entorno JWT_SECRET es obligatoria');
    }
  }

  async register(payload) {
    const email = payload?.email?.trim()?.toLowerCase();
    const password = payload?.password;

    if (!email || !password) {
      throw createError('Email y password son obligatorios', 400);
    }

    if (password.length < 6) {
      throw createError('El password debe tener al menos 6 caracteres', 400);
    }

    const existingUser = await this.userModel.findByEmail(email);
    if (existingUser) {
      throw createError('El email ya está registrado', 409);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    return this.userModel.create({ email, passwordHash });
  }

  async login(payload) {
    const email = payload?.email?.trim()?.toLowerCase();
    const password = payload?.password;

    if (!email || !password) {
      throw createError('Email y password son obligatorios', 400);
    }

    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw createError('Credenciales inválidas', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw createError('Credenciales inválidas', 401);
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      this.jwtSecret,
      { expiresIn: '1d' },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}
