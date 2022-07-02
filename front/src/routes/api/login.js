import bcrypt from 'bcrypt'
import { serialize } from 'cookie'
import { getByEmail } from '../../db/_user'
import { createSession } from '../../store/_sessions'

/** @type {import('./__types/login').RequestHandler} */
export const post = async ({ request }) => {
  let { email, password } = await request.json()
  let returnObj = {
    status: 0,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {}
  }

  try {
    let user = await getByEmail(email)

    if (user == null || user === 'error') throw new Error()

    if (user.length < 1) {
      returnObj.status = 200
      returnObj.body = JSON.stringify({
        result: 'error',
        text: 'Uživatel nenalezen'
      })
      return returnObj
    }

    let compare = await bcrypt.compare(password, user[0].password)

    if (compare) {
      returnObj.status = 200
      returnObj.body = JSON.stringify({
        result: 'success',
        text: 'Přihlášení proběhlo úspěšně!'
      })
      returnObj.headers['Set-Cookie'] = serialize('session', createSession(email).id, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7
      })
      return returnObj
    }

    returnObj.status = 200
    returnObj.body = JSON.stringify({
      result: 'error',
      text: 'Chyba při ověření hesla'
    })
    return returnObj
  } catch (err) {
    returnObj.status = 500
    returnObj.body = JSON.stringify({
      result: 'error',
      text: 'Interní chyba serveru'
    })
    return returnObj
  }
}