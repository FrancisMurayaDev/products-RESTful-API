import { Request, Response } from 'express';
import prisma from './prisma';

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany();
  res.json(products);
};