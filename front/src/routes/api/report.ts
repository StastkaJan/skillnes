import { insertReport } from '$db/_report'
import { emailVal, bioVal } from '$val/validate'

export const post = async ({ request }: {request: Request}) => {
  let { email, text } = await request.json()
  let returnObj = {
    status: 0,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {}
  }
  let validation = {
    email: '',
    text: ''
  }

  validation.email = emailVal(email)
  validation.text = bioVal(text)

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
    await insertReport(email, text)

    returnObj.status = 200
    returnObj.body = JSON.stringify({
      result: 'success',
      text: 'Zpráva úspěšně nahlášena!'
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
