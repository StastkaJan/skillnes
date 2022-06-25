import { Client } from 'pg'
import 'dotenv/config'

let host = process.env.dbHost
let db = process.env.db
let user = process.env.dbUser
let port = process.env.dbPort
let password = process.env.dbPassword

export class DBConnection {
  constructor() {
    this.sql = new Client({
      user,
      host,
      database: db,
      password,
      port: Number(port),
      ssl: {
        rejectUnauthorized: false
      }
    })
  }

  async query(sql = '', data = ['']) {
    await this.sql.connect()

    try {
      const res = await this.sql.query(sql, data)
      return res
    } catch (err) {
      console.log(err)
      return null
    } finally {
      this.sql.end()
    }
  }
}
