"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const envUrl = process.env.NODE_ENV
    ? path_1.default.resolve(__dirname, `../${process.env.NODE_ENV}.env`)
    : path_1.default.resolve(__dirname, `../.env`);
console.log('envUrl', envUrl);
dotenv_1.default.config({
    path: envUrl
});
const routes_1 = require("./src/routes");
const database_1 = __importDefault(require("./config/database"));
const body_parser_1 = __importDefault(require("body-parser"));
// import { cipher, decipher } from './src/helpers';
const app = (0, express_1.default)();
const crosOptions = { credential: true, origin: ["http://localhost:3000", "http://localhost:3001"] };
app.use((0, cors_1.default)());
const port = process.env.PORT;
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// const corsConfig = {
//   origin: true
// };
// app.options('*', cors(corsConfig))
// parse application/json
app.use(body_parser_1.default.json());
database_1.default.then(() => {
    console.log('database connected successfully!');
}).catch((error) => {
    console.log('Error while connecting database', error.message);
});
app.use("/api/", routes_1.restRouter);
app.get('/', (req, res) => {
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