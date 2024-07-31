import express from "express";
import { PlanController } from "../controllers";
import { CheckAuth } from "../middleware";

const planRoute = express.Router();

planRoute.post('/',CheckAuth, PlanController.create);
planRoute.get('/', CheckAuth, PlanController.getAll);
planRoute.get('/:id',CheckAuth, PlanController.getOne);
planRoute.put('/:id',CheckAuth, PlanController.update);
planRoute.delete('/:id',CheckAuth, PlanController.delete);

export default planRoute;