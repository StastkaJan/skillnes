import bcrypt from 'bcrypt'
import { getByEmail, insertUser } from '../../db/_user'
import { nameVal, emailVal, passwordVal } from '../../validate/validate'

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
