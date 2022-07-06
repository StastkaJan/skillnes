import { DBConnection } from './_database'

let dbName = 'report'

export const insertReport = async (email = '', text = '') => {
  let db = new DBConnection()

  try {
    const res = await db.query(
      `INSERT INTO ${dbName} (email, text) VALUES ($1, $2) returning email`,
      [email, text]
    )
    return res?.rows
  } catch (err) {
    console.log(err)
    return err
  }
}
