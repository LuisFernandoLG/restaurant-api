import { Router } from "express";
import { createCustomer } from "../controllers/authController.js";

const router = Router()

router.post("/", createCustomer)

export default router