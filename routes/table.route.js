import { Router } from "express";
import { createTable, getTable, getTables, removeTable, updateTable } from "../controllers/tableController.js";

const router = Router()

router.get("/", getTables)
router.post("/", createTable)
router.get("/:tableId", getTable)
router.delete("/:tableId", removeTable)
router.put("/:tableId", updateTable)

export default router