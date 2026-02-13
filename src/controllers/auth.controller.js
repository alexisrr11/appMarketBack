export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res, next) => {
    try {
      const user = await this.authService.register(req.body);
      res.status(201).json({
        success: true,
        message: 'Usuario registrado correctamente',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const session = await this.authService.login(req.body);
      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: session,
      });
    } catch (error) {
      next(error);
    }
  };
}
