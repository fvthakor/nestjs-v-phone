"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectSocket = void 0;
const connectSocket = (io) => {
    console.log('io connected to socket');
    io.on('connect', (socket) => {
        console.log('socket connected successfuly!', socket);
        // handle various socket connections here
    });
    // put any other code that wants to use the io variable
    // in here
};
exports.connectSocket = connectSocket;
