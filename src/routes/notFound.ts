import express from 'express'

const router = express.Router()

router.route('*').get((_req, res) => {
  res.status(400).send('The content you requested does not exist!')
})

export default router
