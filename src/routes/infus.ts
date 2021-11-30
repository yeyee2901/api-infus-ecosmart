/** Routes for /api/infus/
 * @module routes/infus
 * */

import express from 'express';
import { getInfusNames } from '../controller/controller-infus';

/** Express router object
 * @const
 * */
const router = express.Router();

/** Route to query infus ID & name. Sends JSON as response.
 * @name get/api/infus/
 * @function
 * @inner
 * @memberof module:routes/infus
 * */
router.route('/').get(getInfusNames);

export default router;
