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
import { Server, Socket } from 'socket.io';
// import { cipher, decipher } from './src/helpers';
import http from 'http'
import { GlobalInterface } from './src/interfaces/Gloable.interface';
// import { connectSocket } from './socket';
import RequestCustom from './src/interfaces/RequestCustom.interface';
const app: Express = express();

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

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

Mongoose.then(() => {
  console.log('database connected successfully!')
}).catch((error:any) => {
  console.log('Error while connecting database', error.message);
})

const server = http.createServer(app);
const io  = new Server(server, {
  path: "/api/socket-server",
  cors: {
    origin: '*',
  }
});
// io.on('connect', (socket:Socket) => {
//   console.log('socket connected successfuly!');
//  // handle various socket connections here
// });

io.on('connection', socket => {
  console.log('a user connected');
  //socket.join(/* ... */);

  socket.on('user_connected', (channel) => {
    console.log(`${channel} user joined channel`);
    socket.join(channel);
  });
  // socket.on('join_profile_channel', (channel) => {
  //   console.log(`${channel} user joined channel`);
  //   socket.join(channel);
  // });
  //socket.emit('message', {type:'message', data:'test 001'});
});
// connectSocket(io);

app.use((req:RequestCustom, res, next) => {
  req.io = io;
  next();
});


// global.Attr('io', io);

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

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


export {
  io
}
