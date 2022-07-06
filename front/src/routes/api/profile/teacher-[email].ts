import { parse } from 'cookie'
import { getTeacherById, insertTeacher, updateTeacher, getTeacherSite } from '$db/_teacher'
import { getSession, getSessionEmail } from '$store/_sessions'
import { activeVal, siteVal, bioVal } from '$val/validate'

export const get = async ({ request, params }: {request: Request, params: {email: string}}) => {
  try {
    let session = getSessionEmail(params.email)
    let sessionId = parse(request.headers.get('cookie') || '')?.session

    if (!session || session.id !== sessionId) {
      return {
        status: 403
      }
    }

    let teacher = await getTeacherById(session.userId)

    // @ts-ignore
    if (teacher && teacher[0]) {
      return {
        // @ts-ignore
        body: { teacher: {
          active: teacher[0].active,
          site: teacher[0].site,
          bio: teacher[0].bio
        } }
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
  let { active, site, bio } = await request.json()
  let returnObj = {
    status: 0,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {}
  }
  let validation = {
    active: '',
    site: '',
    bio: ''
  }

  validation.active = activeVal(active)
  validation.site = siteVal(site)
  validation.bio = bioVal(bio)

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
    let sessionId = parse(request.headers.get('cookie') || '')?.session
    let session = getSession(sessionId)

    // @ts-ignore
    if (!sessionId || session.email !== params.email) {
      returnObj.status = 403
      return returnObj
    }

    let sites = await getTeacherSite(site)

    // @ts-ignore
    if (sites.length > 0 && sites[0].user !== session?.userId) {
      returnObj.status = 200
      returnObj.body = JSON.stringify({
        result: 'error',
        text: 'Adresa je používána'
      })
      return returnObj
    }

    let teacher = await getTeacherById(session?.userId)

    if (teacher && teacher.length > 0) {
      await updateTeacher(session?.userId, active, site, bio)

      returnObj.status = 200
      returnObj.body = JSON.stringify({
        result: 'success',
        text: 'Změna úspěšně uložena!'
      })
      return returnObj
    } else {
      await insertTeacher(session?.userId, active, site, bio)

      returnObj.status = 200
      returnObj.body = JSON.stringify({
        result: 'success',
        text: 'Profil učitele vytvořen!'
      })
      return returnObj
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
