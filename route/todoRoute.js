import express from "express";
const router = express.Router();
import {
  getAll,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
} from "../controller/todoController";
import { protectAdmin } from "../middlewares/adminMiddleware";
import { protectUser } from "../middlewares/userMiddleware";
import passport from "passport";

router.route("/").get(protectAdmin, getAll);
// router
//   .route("/todo", passport.authenticate("jwt", { session: false }))
//   .get(getTodos);
router
  .route("/todo")
  .get(passport.authenticate("jwt", { session: false }), getTodos);
router
  .route("/:id")
  .get(getSingleTodo)
  .put(protectUser, updateTodo)
  .delete(protectUser, deleteTodo);
router.route("/").post(protectUser, createTodo);
export default router;
