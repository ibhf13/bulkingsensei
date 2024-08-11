import Joi from "joi";

export const exerciseInRoutineSchema = Joi.object({
  exerciseId: Joi.string().required(),
  sets: Joi.number().integer().min(1).required(),
  reps: Joi.number().integer().min(1).required(),
  weight: Joi.number().positive().allow(0),
});

export const routineSchema = Joi.object({
  name: Joi.string().required(),
  exercises: Joi.array().items(exerciseInRoutineSchema).required(),
});
