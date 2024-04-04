import { Router } from "express";
import { findAllItem } from "../controllers/itemController.js";

export const router = Router();

router.get("/", findAllItem);
