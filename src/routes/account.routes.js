import { Router } from "express"
import validateSchema from "../middleware/validateSchema.js"
import { userGet, userSignIn, userSignUp } from "../controllers/account.controller.js"
import schemaUserSignUp from "../schemas/userSignUp.schema.js"

const accountRouter = Router()

// accountRouter.post("/signup", validateSchema(schemaCustomer), addCustomer)
accountRouter.post("/signup", validateSchema(schemaUserSignUp), userSignUp)
accountRouter.post("/signin", userSignIn)
accountRouter.get("/users/me", userGet)

export default accountRouter
