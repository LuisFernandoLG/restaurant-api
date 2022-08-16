import { Router } from "express";
import { createTag, getTags } from "../controllers/tagController.js";

const router = Router()

router.get("/", getTags)
router.post("/", createTag)


export default router