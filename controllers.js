import prisma from "./prisma.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

export const getProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product." });
  }
};

export const createProduct = async (req, res) => {
  const { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer } = req.body;
  try {
    const newProduct = await prisma.product.create({
      data: { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product." });
  }
};

export const updateProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product." });
  }
};

export const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product." });
  }
};

export const getOfferProducts = async (req, res) => {
  try {
    const offerProducts = await prisma.product.findMany({
      where: { isOnOffer: true },
    });
    res.json(offerProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products on offer." });
  }
};
