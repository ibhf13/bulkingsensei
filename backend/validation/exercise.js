import Joi from "joi";

const exerciseSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(""),
  gifUrl: Joi.string().uri().allow(""),
  defaultSets: Joi.number().integer().min(1).allow(null),
  defaultReps: Joi.number().integer().min(1).allow(null),
  muscleTypeId: Joi.string().required(), // Add this line for muscleType
});

export default exerciseSchema;
