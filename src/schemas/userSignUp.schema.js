import Joi from "joi"

const schemaUserSignUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
})

export default schemaUserSignUp
