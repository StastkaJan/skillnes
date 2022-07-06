import { DBConnection } from './_database'

let dbName = 'public.users'

export const getAll = async () => {
  let db = new DBConnection()

  try {
    const res = await db.query(`SELECT * FROM ${dbName}`)
    return res?.rows
  } catch (err) {
    console.log(err)
    return err
  }
}

export const getByEmail = async (email = '') => {
  let db = new DBConnection()

  try {
    const res = await db.query(`SELECT * FROM ${dbName} WHERE email like $1`, [email])
    return res?.rows
  } catch (err) {
    console.log(err)
    return err
  }
}

export const insertUser = async (name = '', email = '', password = '') => {
  let db = new DBConnection()

  try {
    const res = await db.query(
      `INSERT INTO ${dbName} (name, email, password) VALUES ($1, $2, $3) returning email`,
      [name, email, password]
    )
    return res?.rows
  } catch (err) {
    console.log(err)
    return err
  }
}

export const updateUser = async (name = '', email = '', password = '', oldEmail = '') => {
  let db = new DBConnection()

  try {
    let res
    if (password === '') {
      res = await db.query(
        `UPDATE ${dbName} SET name = $1, email = $2 WHERE email like $3 returning email`,
        [name, email, oldEmail]
      )
    } else {
      res = await db.query(
        `UPDATE ${dbName} SET name = $1, email = $2, password = $3 WHERE email like $4 returning email`,
        [name, email, password, oldEmail]
      )
    }
    return res?.rows
  } catch (err) {
    console.log(err)
    return err
  }
}
