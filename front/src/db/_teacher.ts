import { DBConnection } from './_database'

let dbName = 'teacher'

export const getAllTeachers = async () => {
  let db = new DBConnection()

  try {
    const res = await db.query(`SELECT * FROM ${dbName}`)
    return res?.rows
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getTeacherById = async (id = 0) => {
  let db = new DBConnection()

  try {
    const res = await db.query(`SELECT * FROM ${dbName} WHERE "user" = $1`, [String(id)])
    return res?.rows
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const insertTeacher = async (user = 0, active = '', site = '', bio = '') => {
  let db = new DBConnection()

  try {
    const res = await db.query(
      `INSERT INTO ${dbName} ("user", active, site, bio) VALUES ($1, $2, $3, $4) returning active`,
      [String(user), active, site, bio]
    )
    return res?.rows
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const updateTeacher = async (user = 0, active = '', site = '', bio = '') => {
  let db = new DBConnection()

  try {
    let res = await db.query(
        `UPDATE ${dbName} SET active = $1, site = $2, bio = $3 WHERE "user" = $4 returning active`,
        [active, site, bio, String(user)]
      )
    return res?.rows
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getTeacherSite = async (site = '') => {
  let db = new DBConnection()

  try {
    let res = await db.query(
        `SELECT * FROM ${dbName} WHERE site like $1`,
        [site]
      )
    return res?.rows
  } catch (err) {
    console.log(err)
    throw err
  }
}