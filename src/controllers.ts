import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

// export const getProduct = async (req: Request, res: Response) => {
//   const id = Number(req.params.id);
//   const product = await prisma.product.findUnique({ where: { id } });
//   if (!product)
//     return res.status(404).json({ message: "No product was found." });
//   res.json(product);
// };


export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


export const createProduct = async (req: Request, res: Response) => {
  const {
    productTitle,
    productDescription,
    unitsLeft,
    pricePerUnit,
    isOnOffer,
  } = req.body;
  const product = await prisma.product.create({
    data: {
      productTitle,
      productDescription,
      unitsLeft,
      pricePerUnit,
      isOnOffer,
    },
  });
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const {
    productTitle,
    productDescription,
    unitsLeft,
    pricePerUnit,
    isOnOffer,
  } = req.body;
  const product = await prisma.product.update({
    where: { id },
    data: {
      productTitle,
      productDescription,
      unitsLeft,
      pricePerUnit,
      isOnOffer,
    },
  });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.product.delete({ where: { id } });
  res.status(204).send();
};

export const getOfferProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: { isOnOffer: true },
  });
  res.json(products);
};
