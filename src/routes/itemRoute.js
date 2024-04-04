import { Router } from "express";
import {
  findAllItem,
  findItemById,
  updateItemQuantity,
  retoreItemQuantity,
} from "../controllers/itemController.js";

export const router = Router();

router.get("/", findAllItem);
router.get("/:id", findItemById);
router.put("/restore", retoreItemQuantity);
router.put("/:id", updateItemQuantity);
