import express from "express";
import { AuthRouteHandler } from "./controller";
import { LoginValidationCheck, SignUpValidatorCheck } from "./validators";

const router = express.Router();

router.post("/login", LoginValidationCheck, AuthRouteHandler.loginUser);
router.post(
  "/account",
  SignUpValidatorCheck,
  AuthRouteHandler.createNewAccount
);

export { router as authRouter };
