import { Client } from 'faunadb'

export const fauna = new Client({
  secret: process.env.FAUNA_SECRET_KEY as string,
  domain: 'db.fauna.com',
  scheme: 'https',
})