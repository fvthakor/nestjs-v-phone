// import { Sequelize } from "sequelize";

import mongoose from "mongoose";


// const sequelize = new Sequelize(
//     process.env.DB_NAME ? process.env.DB_NAME : 'donation_app',
//     process.env.DB_USERNAME ? process.env.DB_USERNAME : 'root',
//     process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
//      {
//        host: process.env.DB_HOST ? process.env.DB_HOST : '127.0.0.1',
//        dialect: 'mysql'
//      }
//    );
// export {
//     sequelize,
// };

const database = process.env.DATABASE?process.env.DATABASE:'mongodb://127.0.0.1:27017/test'
const Mongoose = mongoose.connect(database)

export default Mongoose;

