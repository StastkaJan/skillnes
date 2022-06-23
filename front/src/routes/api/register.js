import { sql } from '../../db/_database'

export const get = async () => {
  try {
    sql.connect()
    const res = await sql.query('SELECT * FROM public.users')
    console.log(res)
    return {
      body: res
    }
  } catch (err) {
    console.log(err)
    return {
      body: 'error'
    }
  } finally {
    sql.end()
  }
}
