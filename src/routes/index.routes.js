import { Router } from "express"
import accountRouter from "./account.routes.js"
import rankRouter from "./rank.routes.js"
import urlsRouter from "./urls.routes.js"
const router = Router()

router.use(accountRouter)
router.use(urlsRouter)
router.use(rankRouter)


export default router
