import express from 'express'
import notFound from './routes/notFound'

const app = express()
const PORT = 3000

app.get('/', (_req, res) => {
  res.send('Hellooo')
})

app.use('*', notFound)
app.listen(PORT)
