import express from 'express'
import notFound from './routes/notFound'
import infus from './routes/infus'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (_req, res) => {
  res.send('Hellooo')
})

app.use('/api', infus)
app.use('*', notFound)
app.listen(PORT)
