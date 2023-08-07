import { db } from "../database/database.connection.js";

export async function addUrl(userId, url, shortId) {
  const query = `
    INSERT INTO urls ("userId", url, "shortUrl")
    VALUES ($1, $2, $3)
    RETURNING id, "shortUrl";
  `;
  const values = [userId, url, shortId];

  const result = await db.query(query, values);
  return result;
}

export async function getUrlById(id) {
  const query = `
    SELECT urls.id, urls."shortUrl", urls.url
    FROM urls
    WHERE urls.id = $1;
  `;
  const values = [id];

  const result = await db.query(query, values);
  return result;
}

export async function getUrlByShort(shortUrl) {
  const query = `
    SELECT urls.url
    FROM urls
    WHERE urls."shortUrl" = $1;
  `;
  const values = [shortUrl];

  const result = await db.query(query, values);
  return result;
}

export async function updateVisitCount(shortUrl) {
  const query = `
    UPDATE urls
    SET "visitCount" = "visitCount" + 1
    WHERE urls."shortUrl" = $1;
  `;
  const values = [shortUrl];

  await db.query(query, values);
}

export async function removeUrl(id, userId) {
  const query = `
    DELETE FROM urls
    WHERE urls."id" = $1 AND urls."userId" = $2;
  `;
  const values = [id, userId];

  await db.query(query, values);
}
