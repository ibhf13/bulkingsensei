const express = require("express");
const router = express.Router();
const {
  getAllExercises,
  getExerciseById,
} = require("../controllers/exerciseController");

router.get("/", getAllExercises);
router.get("/:id", getExerciseById);

module.exports = router;
