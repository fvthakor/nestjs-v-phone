import express from "express";
import { ContactController } from "../controllers";

const contactRoute = express.Router();

contactRoute.post('/', ContactController.create);
contactRoute.get('/', ContactController.getAll);
contactRoute.get('/:id', ContactController.getOne);
contactRoute.put('/:id', ContactController.update);
contactRoute.delete('/:id', ContactController.delete);

export default contactRoute;