import jwt from 'jsonwebtoken';

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const verifyToken = (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw createError('Token no proporcionado', 401);
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw createError('JWT_SECRET no configurado', 500);
    }

    const payload = jwt.verify(token, jwtSecret);

    req.user = {
      id: payload.sub,
      email: payload.email,
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(createError('Token inválido o expirado', 401));
    }

    return next(error);
  }
};
