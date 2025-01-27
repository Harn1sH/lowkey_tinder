import validator from "validator";
import { Request } from "express";

export const validateSignUpData = (req: Request) => {
  const { firstName, lastName, emailId, password } = req.body;
  
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    // throw new Error("Please enter a strong Password!");
  }
};

export const validateEditProfileData = (req: Request) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

  return isEditAllowed;
};

export const validateLogInData = (req: Request) => {
  const { emailId, password } = req.body;

  if (!password) {
    throw new Error("Password is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } 
};