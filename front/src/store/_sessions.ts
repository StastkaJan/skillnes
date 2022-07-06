import { v4 as uuidv4 } from 'uuid'

let sessions: Array<{
  email: string,
  id: string,
  userId: number
}> = []

export const createSession = (userEmail = '', userId = 0) => {
  let activeSession = sessions.find(session => session.email === userEmail)

  if (activeSession) return activeSession

  let session = {
    id: uuidv4(),
    userId,
    email: userEmail
  }
  sessions.push(session)

  return session
}

export const getSession = (sessionId = '') => {
  let session = sessions.find(session => session.id === sessionId)
  return session
}

export const getSessionEmail = (userEmail = '') => {
  let session = sessions.find(session => session.email === userEmail)
  return session
}

export const updateSession = (sessionId = '', name: 'id' | 'email' = 'id', value = '') => {
  let session = sessions.find(session => session.id === sessionId)
  if (!session) throw new Error()
  session[name] = value
  return 'success'
}

export const removeSession = (sessionId = '') => {
  let session = sessions.find(session => session.id === sessionId)
  if (!session) return new Error('Session not found')
  sessions = sessions.filter(session => session.id !== sessionId)
  return 'success'
}
