import { Router } from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/food.controller.js";

const router = Router();

router.route("/addfood").post(addFood);
router.route("/listfood").get(listFood)
router.route("/removefood/:id").delete(removeFood)

export default router;
