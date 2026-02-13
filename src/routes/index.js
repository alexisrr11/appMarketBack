import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API backend de lista de supermercado',
  });
});

export default router;
