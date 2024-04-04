import { Router } from "express";
import { addOrder } from "../controllers/orderController.js";

export const router = Router();

router.post("/", addOrder);
