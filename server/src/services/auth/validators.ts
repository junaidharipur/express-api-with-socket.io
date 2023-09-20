import { body } from "express-validator";
import { ValidationCheck } from "../../middlewares/ValidationCheck";

const LoginValidator = [
  body("email").trim().isEmail(),
  body("password").isString().trim(),
];

const SignUpValidator = [
  body("name").isString().trim(),
  body("email").trim().isEmail(),
  body("password").isString().trim(),
];

const UserUpdateValidator = [
  body("name").isString().optional(),
  body("email").trim().isEmail().optional(),
  body("password").isString().trim().optional(),
];

export const LoginValidationCheck = [...LoginValidator, ValidationCheck];
export const SignUpValidatorCheck = [...SignUpValidator, ValidationCheck];
export const UserUpdateValidatorCheck = [
  ...UserUpdateValidator,
  ValidationCheck,
];
