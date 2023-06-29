import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const connectSocket = (io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    
    console.log('io connected to socket');
    io.on('connect', (socket:Socket) => {
        console.log('socket connected successfuly!', socket);
       // handle various socket connections here
    });

    // put any other code that wants to use the io variable
    // in here
};


export {connectSocket};