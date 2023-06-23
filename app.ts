import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
const envUrl = process.env.NODE_ENV 
    ? path.resolve(__dirname, `../${process.env.NODE_ENV}.env`) 
    : path.resolve(__dirname, `../.env`);
console.log('envUrl', envUrl);

dotenv.config({
  path: envUrl
});

import { restRouter } from './src/routes';
import Mongoose from './config/database';
import bodyParser from 'body-parser';

const app: Express = express();
const port = process.env.PORT;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

Mongoose.then(() => {
  console.log('database connected successfully!')
}).catch((error:any) => {
  console.log('Error while connecting database', error.message);
})

app.use("/api/", restRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});