import { Router } from "express";
import { router as itemRoute } from "./itemRoute.js";

export const router = Router();

router.use("/items", itemRoute);

router.use("*", (req, res) => {
  res.status(404).json({ message: "no route corresponding" });
});
