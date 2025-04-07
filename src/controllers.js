import prisma from './prisma.js';

export const getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const getProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  product ? res.json(product) : res.status(404).json({ error: "Product not found" });
};

export const createProduct = async (req, res) => {
  const { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer } = req.body;
  const newProduct = await prisma.product.create({
    data: { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer },
  });
  res.status(201).json(newProduct);
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
  } catch {
    res.status(404).json({ error: "Product not found" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.product.delete({ where: { id } });
    res.json({ message: "Product deleted" });
  } catch {
    res.status(404).json({ error: "Product not found" });
  }
};

export const getOfferProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    where: { isOnOffer: true },
  });
  res.json(products);
};
