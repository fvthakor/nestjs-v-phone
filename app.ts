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


app.post('/api/aviationstack', async (req: Request, res: Response) => {
  try{
    console.log('req.body',req.body);
    const [iataCode, arr_iata, airline_iata, flight_number, DD, MM, YYYY, type] = req.body;
    const axios = require('axios');
    // const airline_name = type && type.trim() != '' ? {airline_name: type} :{}; 
    const departure_date = `${YYYY}-${MM}-${DD}`;
    const params = {
      access_key: process.env.FLIGHT_KEY,
      iataCode: iataCode,
      // arr_iata: arr_iata,
      airline_iata: airline_iata,
      flight_number: flight_number,
      date:  departure_date,
      type: "departure"
    }

    axios.get('https://api.aviationstack.com/v1/flightsFuture', {params})
  .then((response:any) => {
    const apiResponse = response.data;
    if(apiResponse.data.length > 0){
      const flights = apiResponse.data.filter((item:any) => {
        return (
          (item.arrival.iataCode === arr_iata || item.arrival.iataCode === arr_iata.toLowerCase()) 
          && item.flight.number == flight_number
          && item.airline.iataCode == airline_iata.toLowerCase())
      });
      if(flights.length === 0){
        return res.status(400).json({message: 'data not found!'});
      }
      const eligibleFlights =  flights[0];

      const timeDifferenceInMinutes = (date:string, startTime:string, endTime:string) => {
        let startDateTime:any = new Date(`${date}T${startTime}:00`);
        let endDateTime:any = new Date(`${date}T${endTime}:00`);

    // If the end time is earlier than the start time, it means the period crosses midnight
    if (endDateTime <= startDateTime) {
        // Add one day to the end time
        endDateTime.setDate(endDateTime.getDate() + 1);
    }

    // Calculate the difference in milliseconds
    let differenceInMilliseconds = endDateTime - startDateTime;

    // Convert the difference to minutes
    let differenceInMinutes = differenceInMilliseconds / (1000 * 60);

    // Format the end date as a string
    let endDateFormatted = endDateTime.toISOString().split('T')[0];

    return {
        minutes: differenceInMinutes,
        endDate: endDateFormatted
    };
    }
    const flightTimeData = timeDifferenceInMinutes(departure_date, eligibleFlights?.departure?.scheduledTime, eligibleFlights?.arrival?.scheduledTime,)
      const dateData = [DD, MM , YYYY];

      const [ariarrivalYear, ariarrivalMonth, ariarrivalDay] = flightTimeData.endDate.split('-');

      const airlineData = eligibleFlights?.aircraft && eligibleFlights?.aircraft?.modelText ? eligibleFlights?.aircraft.modelText : '';
      const data = [
        eligibleFlights.departure?.iataCode.toUpperCase(), eligibleFlights?.arrival?.iataCode.toUpperCase(), eligibleFlights?.airline?.iataCode.toUpperCase(), eligibleFlights?.flight?.number, ...dateData, '',eligibleFlights?.departure?.scheduledTime, eligibleFlights?.arrival?.scheduledTime, flightTimeData.minutes, ariarrivalDay, ariarrivalMonth, ariarrivalYear, airlineData
      ]
      return res.status(200).json(data);
    }else{
      return res.status(400).json({message: 'data not found!'});
    }
   

  }).catch((error:any) => {
    console.log(error);
    return res.status(500).json({error: error.message});
  });
  

   
  }catch(error:any){
    console.log(error);
    return res.status(500).json({error: error.message});
  }
  
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
