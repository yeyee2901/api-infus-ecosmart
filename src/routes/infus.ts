import express from 'express'

const router = express.Router()

router.route('/infus/:id').get((req, res) => {
  console.log(`requested Infus #${req.params.id}`)
  res.send('You requested an infus!\n')
})

export default router
