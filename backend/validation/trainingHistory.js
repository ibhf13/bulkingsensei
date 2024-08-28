import Joi from "joi";

export const trainingHistorySchema = Joi.object({
  exercises: Joi.array()
    .items(
      Joi.object({
        exerciseId: Joi.string().required(),
        sets: Joi.number().required(),
        reps: Joi.number().required(),
        weight: Joi.number(),
        duration: Joi.object({
          value: Joi.number(),
          unit: Joi.string().valid("seconds", "minutes"),
        }),
      })
    )
    .required(),
});
