import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt";

export async function isEmailTaken(email) {
  try {
    const userExists = await db.query(`SELECT * FROM users WHERE "email"=$1 `, [
      email,
    ])
    console.log("check if email taken")
    return userExists.rowCount > 0
  } catch (error) {
    console.error("Error checking email existence:", error)
    return false
  }
}

export async function userCreate(name, email, password) {
  const client = await db.connect()

  try {
    await client.query("BEGIN")

    const user = await client.query(
      `INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3)`,
      [name, email, password]
    )

    await client.query("COMMIT")
    return user
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
  }
}



export async function loginVerify(email, password) {
  try {
    const userInfo = await db.query(`SELECT * FROM users WHERE "email"=$1`, [
      email,
    ])
    if (userInfo.rowCount == 0 || userInfo.rows[0].password !== password)
      return false
    return true
  } catch (error) {
    return false
  }
}

export async function getUserURLS(email) {
  try {
    const query = `
            SELECT u.id, u.name,
                   COALESCE(SUM(s."visitCount"), 0) AS "visitCount",
                   array_agg(json_build_object('id', s.id, 'url', s.url, 'shortUrl', s.shorturl, 'visitCount', s."visitCount")) AS "shortenedUrls"
            FROM users u
            LEFT JOIN short_urls s ON u.id = s.owner_id
            WHERE u.email = $1
            GROUP BY u.id, u.name
        `

    const userInfo = await db.query(query, [email])

    const user = userInfo.rows[0]
    user.visitCount = user.visitCount || 0
    if (userInfo.rows[0].shortenedUrls[0].id == null)
      userInfo.rows[0].shortenedUrls = []
    return user
  } catch (error) {
    return null
  }
}

export async function userNewSession(email, generatedToken) {
  try {
    const session = await db.query(
      `INSERT INTO sessions ("email","token") VALUES ($1,$2)`,
      [email, generatedToken]
    )
    return session
  } catch (error) {
    return null
  }
}
