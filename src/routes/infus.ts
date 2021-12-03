/** Routes for /api/infus/
 * @module routes/infus
 * */

import express from 'express';
import {
  getInfusByID,
  getAllInfus,
  insertInfusVolume,
  getInfusVolumeByID
} from '../controller/controller-infus';

/** Express router object
 * @const
 * */
const router = express.Router();

// GET -----------------------------------------------
/** Route to query all infus data
 * @name get/api/infus/
 * @function
 * @inner
 * @memberof module:routes/infus
 * */
router.route('/').get(getAllInfus);

/** Route to get infus by ID. Sends JSON as response.
 * @name get/api/infus/:id
 * @function
 * @inner
 * @memberof module:routes/infus
 * */
router.route('/:id').get(getInfusByID);

/** Route to get infus volume by ID - Sends JSON as response.
 * @name get/api/infus/vol/:id
 * @function
 * @inner
 * @memberof module:routes/infus
 * */
router.route(`/vol/:id`).get(getInfusVolumeByID);

// POST ----------------------------------
/** Route to INSERT infus by ID. Status 200 on success, 400 on failure.
 * @name get/api/infus/:id
 * @function
 * @inner
 * @memberof module:routes/infus
 * */
router.route('/:id').post(insertInfusVolume);

export default router;
