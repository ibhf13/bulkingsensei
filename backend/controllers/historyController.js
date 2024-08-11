import TrainingHistory from "../models/TrainingHistory.js";

export const recordSession = async (req, res) => {
  const { error } = trainingHistorySchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { exercises } = req.body;

  try {
    const session = new TrainingHistory({
      userId: req.user.userId,
      exercises,
    });

    await session.save();
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getAllSessions = async (req, res) => {
  try {
    const sessions = await TrainingHistory.find({ userId: req.user.userId });
    res.json(sessions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await TrainingHistory.findById(req.params.id);
    if (!session) return res.status(404).json({ msg: "Session not found" });

    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
