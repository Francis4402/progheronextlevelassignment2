import express, { Application, NextFunction, Request, Response } from 'express';


import cors from 'cors';
import router from './app/modules/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';


const app: Application = express();


app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.get('/', (req, res) => {
  res.send('Hello PH Team');
})

app.use('/api', router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(error, req, res, next);
});

//Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  notFound(req, res, next);
});

export default app;
