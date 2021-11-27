import Express from 'express'

const app = Express()
const PORT = 3000

app.get('/', (_req, res) => {
  res.send("Hellooo")
})

app.listen(PORT)
