const Joi = require("joi");

const exerciseInRoutineSchema = Joi.object({
  exerciseId: Joi.string().required(),
  sets: Joi.number().integer().min(1).required(),
  reps: Joi.number().integer().min(1).required(),
  weight: Joi.number().positive().allow(0),
});

const routineSchema = Joi.object({
  name: Joi.string().required(),
  exercises: Joi.array().items(exerciseInRoutineSchema).required(),
});

module.exports = {
  routineSchema,
};
