const express = require("express");
const router = express.Router();
const {
  createRoutine,
  getAllRoutines,
  updateRoutine,
  deleteRoutine,
} = require("../controllers/routineController");
const auth = require("../middleware/auth");

router.post("/", auth, createRoutine);
router.get("/", auth, getAllRoutines);
router.put("/:id", auth, updateRoutine);
router.delete("/:id", auth, deleteRoutine);

module.exports = router;
