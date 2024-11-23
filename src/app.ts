import express, { Application } from 'express';

const app: Application = express();
import cors from 'cors';
import { BookShopRoutes } from './modules/bookShop_routes';


app.use(cors());
app.use(express.json());

app.use('/api/products', BookShopRoutes);

export default app;
