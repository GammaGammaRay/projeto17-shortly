import {
  isEmailTaken,
  userCreate,
  loginVerify,
  userNewSession,
} from "../repositories/account.repository.js"
import { v4 as uuid } from "uuid"
import bcrypt from "bcrypt"

async function userSignUp(req, res) {
  const { name, email, password, confirmPassword } = req.body
  const hash = bcrypt.hashSync(password, 10)

  try {
    if (password !== confirmPassword)
      return res.status(422).send("Passwords do not match")
    const emailIsTaken = await isEmailTaken(email)
    if (emailIsTaken) return res.status(409).send("Email already used")
    await userCreate(name, email, password)
    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal server error")
  }
}

async function userSignIn(req, res) {
  const { email, password } = req.body
  try {
    const userVerified = await loginVerify(email, password)

    if (!userVerified) return res.sendStatus(401)

    const token = uuid()

    await userNewSession(email, token)

    return res.status(200).send({ token })
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal server error")
  }
}

async function userGetURLS(req, res) {
  const user = res.locals.user
  try {
    const userUrls = await selectUserUrls(user.id)
    res.send(userUrls.rows[0])
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export { userSignUp, userSignIn, userGet }
