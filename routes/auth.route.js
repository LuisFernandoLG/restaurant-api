import { Router } from "express";
import { login, registerCooker, registerWaiter } from "../controllers/authController.js";

const router = Router()

// router.post("/register", registerCustomer)
// router.post("/login", customerLogin)
router.post("/login", login)

router.post("/registerWaiter", registerWaiter)
router.post("/registerCooker", registerCooker)
// router.post("/registerCooker", registerCustomer)


export default router