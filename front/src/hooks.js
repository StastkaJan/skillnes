import { parse } from 'cookie'
import { getSession as getSessionFromApi } from './store/_sessions'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  let session = parse(event.request.headers.get('cookie') || '')

  if (session) {
    let sessionSaved = getSessionFromApi(session.session)

    if (sessionSaved) {
      // @ts-ignore
      event.locals.user = { email: sessionSaved.email }
      return resolve(event)
    }
  }

  // @ts-ignore
  event.locals.user = null

  return resolve(event)
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  // @ts-ignore
  return event?.locals?.user
    ? {
        user: {
          // @ts-ignore
          email: event.locals.user.email
        }
      }
    : {}
}
