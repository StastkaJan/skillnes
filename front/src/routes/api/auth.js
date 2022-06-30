import bcrypt from 'bcrypt'
import { serialize } from 'cookie'
import { getByEmail, insertUser } from '../../db/_user'
import { nameVal, emailVal, passwordVal } from '../../validate/validate'
import { createSession } from '../../store/_sessions'

export const get = async ({ request }) => {
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

    returnObj.status = 500
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

export const post = async ({ request }) => {
  let { name, email, password } = await request.json()
  let returnObj = {
    status: 0,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {}
  }
  let validation = {}

  validation.name = nameVal(name)
  validation.email = emailVal(email)
  validation.password = passwordVal(password)

  Object.keys(validation).forEach(key => {
    if (validation[key] === '') {
      delete validation[key]
    }
  })

  if (Object.keys(validation).length > 0) {
    returnObj.status = 200
    returnObj.body = JSON.stringify({
      result: 'error',
      text: validation[Object.keys(validation)[0]]
    })
    return returnObj
  }

  try {
    let emailsInDB = await getByEmail(email)

    if (emailsInDB == null || emailsInDB === 'error') throw new Error()

    if (emailsInDB.length > 0) {
      returnObj.status = 200
      returnObj.body = JSON.stringify({
        result: 'error',
        text: 'Email je používán'
      })
      return returnObj
    }

    return await new Promise(resolve => {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) throw err

        await insertUser(name, email, hash)

        returnObj.status = 200
        returnObj.body = JSON.stringify({
          result: 'success',
          text: 'Registrace proběhla úspěšně!'
        })
        resolve(returnObj)
      })
    })
  } catch (err) {
    returnObj.status = 500
    returnObj.body = JSON.stringify({
      result: 'error',
      text: 'Interní chyba serveru'
    })
    return returnObj
  }
}
