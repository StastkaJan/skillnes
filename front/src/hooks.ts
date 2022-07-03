import type { GetSession } from '@sveltejs/kit'
import { parse } from 'cookie'
import { getSession as getSessionFromApi } from '$store/_sessions'

// @ts-ignore
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

export function getSession(event: GetSession) {
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
