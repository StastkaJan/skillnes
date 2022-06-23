import { Client } from 'pg'
import 'dotenv/config'

let host = process.env.dbHost
let db = process.env.db
let user = process.env.dbUser
let port = process.env.dbPort
let password = process.env.dbPassword

export const sql = new Client({
  user,
  host,
  database: db,
  password,
  port: Number(port),
  ssl: {
    rejectUnauthorized: false
  }
})
