import { getAll, insertUser } from '../../db/_user'

export const get = async () => {
  try {
    const res = getAll()
    console.log(res)
    return {
      body: res
    }
  } catch (err) {
    console.log(err)
    return {
      body: 'error'
    }
  }
}

export const post = async (name = '', email = '', password = '') => {
  try {
    const res = insertUser(name, email, password)
    console.log(res)
    return {
      body: res
    }
  } catch (err) {
    console.log(err)
    return {
      body: 'error'
    }
  }
}
