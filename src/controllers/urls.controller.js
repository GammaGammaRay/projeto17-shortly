import { db } from "../database/database.connection.js"
import { nanoid } from "nanoid"
import {
  addUrl,
  getUrlById,
  getUrlByShort,
  updateVisitCount,
  removeUrl,
} from "../repositories/urls.repository.js"

async function urlShorten(req, res) {
    const { url } = req.body;
  
    // Make sure that res.locals.user is properly set before accessing the 'id' property
    const userId = res.locals.user ? res.locals.user.id : null;
  
    if (!userId) {
      return res.status(401).send("User not authenticated");
    }
  
    const shortId = nanoid(8);
    try {
      const newShort = await addUrl(userId, url, shortId);
      res.status(201).send(newShort.rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  
  async function urlGetById(req, res) {
    const { id } = req.params;
    try {
      const shortUrl = await getUrlById(id);
      if (shortUrl.rowCount === 0) return res.sendStatus(404);
  
      res.status(200).send(shortUrl.rows[0]);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  

async function urlRedirectTo(req, res) {
  const { shortUrl } = req.params
  try {
    const url = await getUrlByShort(shortUrl)
    if (url.rowCount === 0) return res.sendStatus(404)

    await updateVisitCount(shortUrl)

    res.redirect(url.rows[0].url)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

async function urlDelete(req, res) {
  const { id } = req.params
  const userId = res.locals.user.id

  try {
    const url = await getUrlById(id)
    if (url.rowCount === 0) return res.sendStatus(404)

    const deleteTry = await removeUrl(id, userId)
    if (deleteTry.rowCount === 0) return res.sendStatus(401)

    res.sendStatus(204)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export { urlShorten, urlGetById, urlRedirectTo, urlDelete }
