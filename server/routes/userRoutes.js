import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  getUser,
  updateUser,
  deleteUser,
  logoutUser,
} from "../controller/userController.js";
import { protect } from "../middlewares/authMiddlwware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.get("/me", protect, getUser);
router.put("/update", protect, updateUser);
router.delete("/delete", protect, deleteUser);
router.post("/logout", protect, logoutUser);

export default router;
