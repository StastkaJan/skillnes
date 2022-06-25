import { DBConnection } from './_database'

export const getAll = async () => {
  let db = new DBConnection()

  try {
    const res = await db.query('SELECT * FROM public.users')
    return res?.rows
  } catch (err) {
    console.log(err)
    return 'error'
  }
}

export const getByEmail = async (email = '') => {
  let db = new DBConnection()

  try {
    const res = await db.query('SELECT * FROM public.users WHERE email like $1', [email])
    return res?.rows
  } catch (err) {
    console.log(err)
    return 'error'
  }
}

export const insertUser = async (name = '', email = '', password = '') => {
  let db = new DBConnection()

  try {
    const res = await db.query(
      'INSERT INTO public.users (name, email, password) VALUES ($1, $2, $3) returning email',
      [name, email, password]
    )
    return res
  } catch (err) {
    console.log(err)
    return 'error'
  }
}
