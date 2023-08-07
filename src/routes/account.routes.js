import { Router } from "express"
import validateSchema from "../middleware/validateSchema.js"
import {
  userGetURLS,
  userSignIn,
  userSignUp,
} from "../controllers/account.controller.js"
import schemaUserSignUp from "../schemas/userSignUp.schema.js"

const accountRouter = Router()

// accountRouter.post("/signup", validateSchema(schemaCustomer), addCustomer)
accountRouter.post("/signup", validateSchema(schemaUserSignUp), userSignUp)
accountRouter.post("/signin", userSignIn)
accountRouter.get("/users/me", userGetURLS)

export default accountRouter
