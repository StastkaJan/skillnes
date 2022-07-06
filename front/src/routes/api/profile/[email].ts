import bcrypt from 'bcrypt'
import { parse } from 'cookie'
import { getByEmail, updateUser } from '$db/_user'
import { getSession, getSessionEmail } from '$store/_sessions'
import { nameVal, emailVal, passwordVal } from '$val/validate'

export const get = async ({ request, params }: {request: Request, params: {email: string}}) => {
  try {
    let user = {}
    let session = getSessionEmail(params.email)
    let sessionId = parse(request.headers.get('cookie') || '')?.session

    if (!session || session.id !== sessionId) {
      return {
        status: 403
      }
    }

    if (params.email) {
      // @ts-ignore
      user = await getByEmail(params.email)
    }

    // @ts-ignore
    if (user && user[0]) {
      return {
        // @ts-ignore
        body: { user: user[0] }
      }
    }

    return {
      status: 404
    }
  } catch (err) {
    console.log(err)
    return {
      status: 500
    }
  }
}

export const post = async ({ request, params }: {request: Request, params: {email: string}}) => {
  let { name, email, password } = await request.json()
  let returnObj = {
    status: 0,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {}
  }
  let validation = {
    name: '',
    email: '',
    password: ''
  }

  validation.name = nameVal(name)
  validation.email = emailVal(email)
  if (password !== '') {
    validation.password = passwordVal(password)
  }

  Object.keys(validation).forEach(key => {
    // @ts-ignore
    if (validation[key] === '') {
      // @ts-ignore
      delete validation[key]
    }
  })

  if (Object.keys(validation).length > 0) {
    returnObj.status = 200
    returnObj.body = JSON.stringify({
      result: 'error',
      // @ts-ignore
      text: validation[Object.keys(validation)[0]]
    })
    return returnObj
  }

  try {
    let emailsInDB = await getByEmail(email)

    if (emailsInDB == null || emailsInDB === 'error') throw new Error()

    let sessionId = parse(request.headers.get('cookie') || '')?.session
    let session = getSession(sessionId)

    // @ts-ignore
    if (!sessionId || session.email !== params.email) {
      returnObj.status = 403
      return returnObj
    }

    // @ts-ignore
    if (emailsInDB.length > 0 && params.email !== email) {
      returnObj.status = 200
      returnObj.body = JSON.stringify({
        result: 'error',
        text: 'Email je používán'
      })
      return returnObj
    }

    if (password === '') {
      await updateUser(name, email, password, params.email)

      returnObj.status = 200
      returnObj.body = JSON.stringify({
        result: 'success',
        text: 'Změna úspěšně uložena!'
      })
      return returnObj
    } else {
      return await new Promise(resolve => {
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) throw err

          await updateUser(name, email, hash, params.email)

          returnObj.status = 200
          returnObj.body = JSON.stringify({
            result: 'success',
            text: 'Změna úspěšně uložena!'
          })
          resolve(returnObj)
        })
      })
    }
  } catch (err) {
    returnObj.status = 500
    returnObj.body = JSON.stringify({
      result: 'error',
      text: 'Interní chyba serveru'
    })
    return returnObj
  }
}
