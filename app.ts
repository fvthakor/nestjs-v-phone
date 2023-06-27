import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
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
// import { cipher, decipher } from './src/helpers';

const app: Express = express();

const crosOptions = {credential: true, origin: ["http://localhost:3000", "http://localhost:3001" ]};
app.use(cors())

const port = process.env.PORT;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
// const corsConfig = {
//   origin: true
// };
// app.options('*', cors(corsConfig))

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

// const encriptedString = cipher('testtesttest');
// const enString = encriptedString('test');
// console.log('enString',enString);

// const decipherString = decipher('testtesttest');
// const newString = decipherString(enString);
// console.log('newString', newString);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

