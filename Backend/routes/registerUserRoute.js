import { Router } from "express";
import { SignInUser, SignUpUser } from "../contollers/registerUserController.js";
const router=Router()

router.post("/signUp",SignUpUser)
router.post("/signIn",SignInUser)
export default router;