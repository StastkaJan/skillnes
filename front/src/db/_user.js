import { sql } from './_database'

export const getAll = async () => {
  let client = await sql.connect()

  try {
    const res = await client.query('SELECT * FROM public.users')
    return res
  } catch (err) {
    console.log(err)
    return 'error'
  } finally {
    client.release()
  }
}

export const getByEmail = async (email = '') => {
  let client = await sql.connect()

  try {
    const res = await client.query('SELECT * FROM public.users WHERE email like ?', [email])
    return res
  } catch (err) {
    console.log(err)
    return 'error'
  } finally {
    client.release()
  }
}

export const insertUser = async (name = '', email = '', password = '') => {
  let client = await sql.connect()

  try {
    const res = await client.query(
      'INSERT INTO public.users (name, email, password) VALUES (?, ?, ?) returning email',
      [name, email, password]
    )
    return res
  } catch (err) {
    console.log(err)
    return 'error'
  } finally {
    client.release()
  }
}
