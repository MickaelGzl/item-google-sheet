import { Router } from "express";
import {
  findAllItem,
  findItemById,
  updateItemQuantity,
} from "../controllers/itemController.js";

export const router = Router();

router.get("/", findAllItem);
router.get("/:id", findItemById);
router.put("/:id", updateItemQuantity);
