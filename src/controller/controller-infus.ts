import { mysqlQuery } from '../model/model-infus';
import { IInfusData, IInfusVolMeasurement } from '../structures/struct-infus';
import { APIErrorType } from '../structures/struct-api';
import { Request, Response } from 'express';

/** @module controller/controller-infus
 *
 * Controller for infus data. This module will manage how to interpret user request
 * and results from MySQL query. The logic behind mysql query itself is done in model/model-infus.ts
 *
 * When writting a new controller, the controller must have only 2 exact behaviour:
 * 1. OK, signifies that the user request AND the MySQL query result succeed with no error
 * 2. ERROR, when any of the user request OR query result produces an error
 *
 * The ERROR type should comply with specifications in structures/struct-infus.ts
 * */

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

  mysqlQuery(database, query, (qres, qerr) => {
    if (!qerr) {
      if (Array.isArray(qres)) {
        if (qres.length > 0) {
          if ((qres[0] as IInfusData).id) {
            res.json(qres).status(200);
          } else {
            res.status(500).json({
              err: true,
              type: APIErrorType.DatabaseError,
              msg: 'WARNING: the data that you requested seems to have different shape than expected. Check the query & database'
            });
          }
        } else {
          // no result
          res.status(404).json({
            err: true,
            type: APIErrorType.NoResultError,
            msg: `[ERROR] NO INFUS RECORD FOUND`
          });
        }
      }
    } else {
      // Query error (internal)
      res
        .status(500)
        .json({
          err: true,
          type: APIErrorType.DatabaseError,
          msg: qerr.message
        })
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

  mysqlQuery(database, query, (qres, qerr) => {
    if (!qerr) {
      if (Array.isArray(qres)) {
        if (qres.length > 0) {
          if ((qres[0] as IInfusData).id) {
            res.json(qres).status(200);
          } else {
            res.status(500).json({
              err: true,
              type: APIErrorType.DatabaseError,
              msg: `[WARNING] You may have queried different data than expected since the data received have different shape`
            });
          }
        } else {
          res.status(404).json({
            err: true,
            type: APIErrorType.NoResultError,
            msg: '[ERROR] NO INFUS RECORD FOUND WITH SPECIFIED ID'
          });
        }
      }
    } else {
      // Query error (internal)
      res
        .status(500)
        .json({
          err: true,
          type: APIErrorType.DatabaseError,
          msg: qerr.message
        });
    }
  });
};

/**
 * Handler function for GET/api/infus/vol/:id
 * @function
 * @name getInfusVolumeByID
 * @param {Request} req - request object from Express
 * @param {Response} res - response object from Express
 * */
export const getInfusVolumeByID = (req: Request, res: Response) => {
  const idInfus = req.params.id;
  const database = `infus`;
  const query = `SELECT * FROM infus_volume WHERE IDInfus = ${idInfus}`;

  mysqlQuery(database, query, (result, err) => {
    if (!err) {
      // by default the mysql query should return an array
      if (Array.isArray(result)) {
        const infusData = result as IInfusVolMeasurement[];
        if (infusData.length > 0) {
          // check the data shape
          if (infusData[0].IDInfus) {
            res.status(200).json(result);
          } else {
            res.status(500).json({
              err: true,
              type: APIErrorType.DatabaseError,
              msg: 'WARNING: the data that you requested seems to have different form than expected. Check the query & database'
            });
          }
        } else {
          res.status(404).json({
            err: true,
            type: APIErrorType.NoResultError,
            msg: 'NO RESULT FOUND'
          });
        }
      }
    } else {
      res
        .status(500)
        .json({
          err: true,
          type: APIErrorType.DatabaseError,
          msg: err.message
        });
    }
  });
};

/**
 * Handler function for POST/api/infus/vol/:id - Inject the data in request body with JSON formatted as below:
 * {
 *   volumeLoadcell: <number>,
 *   volumeCV: <number>
 * }
 *
 * ex:
 * request to: POST/api/infus/vol/4
 * {
 *   volumeLoadcell: 250,
 *   volumeCV: 251
 * }
 *
 * User must specify both the volume values, omitting any of them will insert
 * 0 as a default value
 * @function
 * @name insertInfusVolume
 * @param {Request} req - request object from Express
 * @param {Response} res - response object from Express
 * */
export const insertInfusVolume = (req: Request, res: Response) => {
  const idInfus = req.params.id;
  const volumeLoadcell: number = req.body.volumeLoadcell || 0;
  const volumeCV: number = req.body.volumeCV || 0;
  const database = `infus`;
  const query = `INSERT INTO infus_volume(IDInfus, volumeLoadcell, volumeCV) VALUES (${idInfus}, ${volumeLoadcell}, ${volumeCV})`;

  mysqlQuery(database, query, (result, err) => {
    if (!err) {
      res.status(200).json(result);
    } else {
      res
        .status(500)
        .json({
          err: true,
          type: APIErrorType.DatabaseError,
          msg: err.message
        });
    }
  });
};
