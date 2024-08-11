const Joi = require("joi");

const exerciseInHistorySchema = Joi.object({
  exerciseId: Joi.string().required(),
  sets: Joi.number().integer().min(1).required(),
  reps: Joi.number().integer().min(1).required(),
  weight: Joi.number().positive().allow(0),
});

const trainingHistorySchema = Joi.object({
  exercises: Joi.array().items(exerciseInHistorySchema).required(),
});

module.exports = {
  trainingHistorySchema,
};
