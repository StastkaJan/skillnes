import { getAllActiveTeachers } from '$db/_teacher'

export const get = async () => {
  let returnObj = {
    status: 0,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {}
  }

  try {
    let teachers = await getAllActiveTeachers()

    returnObj.status = 200
    returnObj.body = JSON.stringify({
      teachers
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
