import { Request, Response } from 'express';
import { customerService } from './customer_service';


export const customerController = {
  async getAll(req: Request, res: Response) {
    const data = await customerService.getAll();
    res.json(data);
  },
};
