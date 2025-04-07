import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getOfferProducts,
} from "./controllers.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the Products API");
});

router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);
router.get("/products/offers", getOfferProducts);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
