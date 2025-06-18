import * as reportService from "../services/report.service";
import { Request, Response } from "express";

export const getSales = async (req: Request, res: Response) => {
  const sales = await reportService.getSalesSummary();
  res.json(sales);
};

export const getTopItems = async (req: Request, res: Response) => {
  const items = await reportService.getTopDishes();
  res.json(items);
};

export const getAverageOrder = async (req: Request, res: Response) => {
  const avg = await reportService.getAverageOrderValue();
  res.json(avg);
};
