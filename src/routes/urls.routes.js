import { Router } from "express";
import validateSchema from "../middleware/validateSchema.js";
import { urlDelete, urlGetById, urlRedirectTo, urlShorten } from "../controllers/urls.controller.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", urlShorten)
urlsRouter.get("/urls/:id", urlGetById)
urlsRouter.get("/urls/open/:shortUrl", urlRedirectTo)
urlsRouter.delete("/urls/:id", urlDelete)
// customerRouter.post("/customers", validateSchema(schemaCustomer), addCustomer)


export default urlsRouter;