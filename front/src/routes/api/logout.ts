import { parse, serialize } from 'cookie'
import { removeSession } from '$store/_sessions'

export const del = async ({ request }: {request: Request}) => {
  let returnObj = {
    status: 0,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {}
  }

  try {
    let session = parse(request.headers.get('cookie') || '')

    if (session?.session) {
      removeSession(session.session)
    }

    returnObj.status = 200
    returnObj.body = JSON.stringify({
      result: 'success',
      text: 'Odhlášení proběhlo úspěšně!'
    })
    // @ts-ignore
    returnObj.headers['Set-Cookie'] = serialize('session', '', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0)
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
