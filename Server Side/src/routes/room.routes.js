import { Router } from "express";
import {
  addRoom,
  categoriesByCity,
  deleteRoom,
  getAllRooms,
  getRoom,
} from "../controllers/room.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Public routes

router.route("/").post(upload.array("images"), addRoom).get(categoriesByCity);

router.route("/:id").get(getRoom).delete(deleteRoom);

// router.use(verifyJWT);

// Protected routes

export default router;
