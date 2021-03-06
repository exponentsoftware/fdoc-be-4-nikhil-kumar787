import express from "express";
import {
  authAdmin,
  authUser,
  registerAdmin,
  registerUser,
} from "../controller/authController.js";
const router = express.Router();

// Login Page
router.get("/loginpage", (req, res) => res.render("login"));

// Register Page
router.get("/registerpage", (req, res) => res.render("register"));

router.route("/register").post(registerUser);
router.route("/admin/register").post(registerAdmin);
router.post("/login", authUser);
router.post("/admin/login", authAdmin);
export default router;
