import express, { Application } from 'express';

const app: Application = express();
import cors from 'cors';
import { BookShopRoutes } from './modules/bookShop_routes';
import { OrderRoutes } from './modules/bookShopOrder_routes';

app.use(cors());
app.use(express.json());

app.use('/api/products', BookShopRoutes);

app.use('/api/orders', OrderRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Hello World   Phhero3214',
  });
});

export default app;
