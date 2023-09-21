import express from "express";
import { AuthRouteHandler } from "./controller";
import { AuthCheck } from "../../middlewares/AuthCheck";
import {
  LoginValidationCheck,
  SignUpValidatorCheck,
  UserUpdateValidatorCheck,
} from "./validators";

const router = express.Router();

router.route("/login").post(LoginValidationCheck, AuthRouteHandler.loginUser);
router
  .route("/account")
  .post(SignUpValidatorCheck, AuthRouteHandler.createNewAccount);
router
  .route("/profile")
  .post(AuthCheck, UserUpdateValidatorCheck, AuthRouteHandler.updateUser);

export { router as authRouter };
