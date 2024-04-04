import { Router } from "express";
import { router as itemRoute } from "./itemRoute.js";
import { router as orderRoute } from "./orderRoute.js";

export const router = Router();

router.use("/items", itemRoute);
router.use("/orders", orderRoute);

router.use("*", (req, res) => {
  res.status(404).json({ message: "no route corresponding" });
});
