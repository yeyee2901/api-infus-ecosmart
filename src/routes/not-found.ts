/** Route for not found
 * @module routes/notFound
 * */

import express from 'express';
import { APIErrorType } from '../structures/struct-api';

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
router
  .route('*')
  .get((_req, res) => {
    res
      .status(404)
      .json({
        err: true,
        type: APIErrorType.RequestError,
        msg: 'ROUTE DOES NOT EXIST!'
      });
  })
  .post((_req, res) => {
    res
      .status(404)
      .json({
        err: true,
        type: APIErrorType.RequestError,
        msg: 'ROUTE DOES NOT EXIST!'
      });
  })
  .put((_req, res) => {
    res
      .status(404)
      .json({ err: true, type: APIErrorType, msg: 'ROUTE DOES NOT EXIST!' });
  })
  .delete((_req, res) => {
    res
      .status(404)
      .json({ err: true, type: APIErrorType, msg: 'ROUTE DOES NOT EXIST!' });
  });

export default router;
