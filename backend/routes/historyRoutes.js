const express = require("express");
const router = express.Router();
const {
  recordSession,
  getAllSessions,
  getSessionById,
} = require("../controllers/historyController");
const auth = require("../middleware/auth");

router.post("/", auth, recordSession);
router.get("/", auth, getAllSessions);
router.get("/:id", auth, getSessionById);

module.exports = router;
