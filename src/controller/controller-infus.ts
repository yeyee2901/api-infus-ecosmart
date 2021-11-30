import { mysqlGetData } from '../model/model-infus';
import { IInfusData } from '../structures/struct-infus';
import { Request, Response } from 'express';

/**
 * Handler function for /api/infus/ route. sends JSON as response.
 * @function
 * @name getAllInfus
 * @param {Request} _req - request object from Express
 * @param {Response} res - response object from Express
 * */
export const getAllInfus = (_req: Request, res: Response): void => {
  const database = `infus`;
  const table = `infus_table`;
  const query = `SELECT * FROM ${table}`;

  mysqlGetData(database, query, (qres, qerr) => {
    if (!qerr) {
      if (Array.isArray(qres)) {
        if (qres.length > 0) {
          if ((qres[0] as IInfusData).id) {
            res.json(qres).status(200);
          } else {
            res
              .json({
                msg: `[WARNING] You may have queried different data than expected since the data received has different shape`
              })
              .status(400);
          }
        } else {
          // no result
          res
            .json({
              msg: `[ERROR] NO INFUS RECORD FOUND`
            })
            .status(404);
        }
      }
    } else {
      // Query error
      res.json({ msg: qerr.message }).status(400);
    }
  });
};

/**
 * Handler function for /api/infus/:id route. Sends JSON as a response.
 * @function
 * @name getInfusByID
 * @param {Request} _req - request object from Express
 * @param {Response} res - response object from Express
 * */
export const getInfusByID = (req: Request, res: Response): void => {
  const infusID = req.params.id;
  const database = `infus`;
  const table = `infus_table`;
  const query = `SELECT * FROM ${table} WHERE id = ${infusID}`;

  mysqlGetData(database, query, (qres, qerr) => {
    if (!qerr) {
      if (Array.isArray(qres)) {
        if (qres.length > 0) {
          if ((qres[0] as IInfusData).id) {
            res.json(qres).status(200);
          } else {
            res
              .json({
                msg: `[WARNING] You may have queried different data than expected since the data received have different shape`
              })
              .status(400);
          }
        } else {
          res
            .json({ msg: '[ERROR] NO INFUS RECORD FOUND WITH SPECIFIED ID' })
            .status(404);
        }
      }
    } else {
      res.json({ msg: qerr.message }).status(400);
    }
  });
};
