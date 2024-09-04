import mongoose from "mongoose";
import TrainingHistory from "../models/TrainingHistory.js";
import { trainingHistorySchema } from "../validation/trainingHistory.js";

export const recordSession = async (req, res) => {
  const { error } = trainingHistorySchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { exercises } = req.body;

  try {
    const session = new TrainingHistory({
      userId: req.userId,
      exercises,
    });

    await session.save();
    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await TrainingHistory.findById(req.params.id).populate(
      "exercises.exerciseId",
      "name description"
    );
    if (!session) return res.status(404).json({ msg: "Session not found" });

    // Check if the session belongs to the authenticated user
    if (session.userId.toString() !== req.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    res.json(session);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getAllSessions = async (req, res) => {
  try {
    console.log("Fetching sessions for userId:", req.userId);

    const sessions = await TrainingHistory.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          sessions: { $push: "$$ROOT" },
        },
      },
      { $sort: { _id: -1 } },
      {
        $project: {
          _id: 1,
          sessions: {
            $map: {
              input: "$sessions",
              as: "session",
              in: {
                _id: "$$session._id",
                date: "$$session.date",
                exercises: {
                  $map: {
                    input: "$$session.exercises",
                    as: "exercise",
                    in: {
                      $mergeObjects: [
                        "$$exercise",
                        {
                          exerciseId: { $toObjectId: "$$exercise.exerciseId" },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "exercises",
          localField: "sessions.exercises.exerciseId",
          foreignField: "_id",
          as: "exerciseDetails",
        },
      },
      {
        $project: {
          _id: 1,
          sessions: {
            $map: {
              input: "$sessions",
              as: "session",
              in: {
                _id: "$$session._id",
                date: "$$session.date",
                exercises: {
                  $map: {
                    input: "$$session.exercises",
                    as: "exercise",
                    in: {
                      $mergeObjects: [
                        "$$exercise",
                        {
                          exerciseDetails: {
                            $arrayElemAt: [
                              {
                                $filter: {
                                  input: "$exerciseDetails",
                                  cond: {
                                    $eq: [
                                      "$$this._id",
                                      "$$exercise.exerciseId",
                                    ],
                                  },
                                },
                              },
                              0,
                            ],
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    ]);

    console.log(`Found ${sessions.length} session groups`);
    if (sessions.length > 0) {
      console.log(
        "Sample session group:",
        JSON.stringify(sessions[0], null, 2)
      );
    }

    res.json(sessions);
  } catch (err) {
    console.error("Error in getAllSessions:", err.message);
    res.status(500).send("Server error");
  }
};
