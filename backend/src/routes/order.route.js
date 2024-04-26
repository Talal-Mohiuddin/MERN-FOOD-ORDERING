import { Router } from "express";
import { isUserAuthenticated } from "../middlewares/Auth.js";
import {
  VerifyOrder,
  placeOrder,
  userOrders,
  getOrders,
  updateStatus,
} from "../controllers/order.controller.js";
const router = Router();

router.route("/place").post(isUserAuthenticated, placeOrder);
router.route("/verify").post(VerifyOrder);
router.route("/userorders").get(isUserAuthenticated, userOrders);
router.route("/getorders").get(getOrders)
router.route("/updatestatus").post(updateStatus)

export default router;
