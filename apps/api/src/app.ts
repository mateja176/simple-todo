import { Hono } from 'hono'
import auth from './routes/auth.js'

const app = new Hono()

app.route('/api/auth', auth)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
