import { Request, Response } from 'express';
import prisma from './prisma';

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return res.status(404).json({ message: 'No product was found.' });
  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  const { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer } = req.body;
  const product = await prisma.product.create({
    data: { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer },
  });
  res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer } = req.body;
  const product = await prisma.product.update({
    where: { id },
    data: { productTitle, productDescription, unitsLeft, pricePerUnit, isOnOffer },
  });
  res.json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.product.delete({ where: { id } });
  res.status(204).send();
};

export const getOfferProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({ where: { isOnOffer: true } });
  res.json(products);
};
