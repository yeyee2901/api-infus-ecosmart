/** Route for not found
 * @module routes/notFound
 * */

import express from 'express';

/** Express router object
 * @const
 * */
const router = express.Router();

/** Route to requested contents that are not found
 * @name get/*
 * @function
 * @inner
 * @memberof module:routes/notFound
 * */
router.route('*').get((_req, res) => {
  res.status(404).json({ msg: 'content you requested is not found!' });
});

export default router;
