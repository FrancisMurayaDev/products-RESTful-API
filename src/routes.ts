import express from 'express';
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getOfferProducts,
} from './controllers';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/offers', getOfferProducts);
// router.get('/products/:id', getProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;