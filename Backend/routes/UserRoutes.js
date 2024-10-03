import { Router } from "express";
import { getUserInfoByToken } from "../contollers/UserContoller.js";
const router = Router();
import { authenticateToken } from "../middleware/UserMiddleWhere.js";

router.get("/userinfo", authenticateToken, getUserInfoByToken);

export default router;
