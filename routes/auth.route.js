import { Router } from "express";
import { customerLogin, registerCustomer } from "../controllers/authController.js";

const router = Router()

router.post("/register", registerCustomer)
router.post("/login", customerLogin)

export default router