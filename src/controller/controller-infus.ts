import { mysqlQuery } from '../model/model-infus';
import { IInfusData, IInfusVolMeasurement } from '../structures/struct-infus';
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

  mysqlQuery(database, query, (qres, qerr) => {
    if (!qerr) {
      if (Array.isArray(qres)) {
        if (qres.length > 0) {
          if ((qres[0] as IInfusData).id) {
            res.json(qres).status(200);
          } else {
            res.status(500).json({
              badRequest: false,
              msg: 'WARNING: the data that you requested seems to have different shape than expected. Check the query & database'
            });
          }
        } else {
          // no result
          res.status(404).json({
            badRequest: false,
            msg: `[ERROR] NO INFUS RECORD FOUND`
          });
        }
      }
    } else {
      // Query error (internal)
      res.status(400).json({ badRequest: true, msg: qerr.message }).status(400);
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
              badRequest: true,
              msg: `[WARNING] You may have queried different data than expected since the data received have different shape`
            });
          }
        } else {
          res.status(404).json({
            badRequest: false,
            msg: '[ERROR] NO INFUS RECORD FOUND WITH SPECIFIED ID'
          });
        }
      }
    } else {
      // Query error (internal)
      res.status(400).json({ badRequest: true, msg: qerr.message });
    }
  });
};

/**
 * Handler function for POST/api/infus/vol/:id - Sends JSON as a response.
 * @function
 * @name insertInfusVolume
 * @param {Request} req - request object from Express
 * @param {Response} res - response object from Express
 * */
export const insertInfusVolume = (req: Request, res: Response) => {
  const idInfus = req.params.id;
  const volumeLoadcell = req.body.volumeLoadcell;
  const volumeCV = req.body.volumeCV;
  const database = `infus`;
  const query = `INSERT INTO infus_volume(IDInfus, volumeLoadcell, volumeCV) VALUES (${idInfus}, ${volumeLoadcell}, ${volumeCV})`;

  mysqlQuery(database, query, (result, err) => {
    if (!err) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ badRequest: true, msg: err.message });
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
      if (Array.isArray(result)) {
        const infusData = result as IInfusVolMeasurement[];
        if (infusData.length > 0) {
          if (infusData[0].volumeLoadcell) {
            res.status(200).json(result);
          } else {
            res.status(500).json({
              badRequest: false,
              msg: 'WARNING: the data that you requested seems to have different form than expected. Check the query & database'
            });
          }
        } else {
          res.status(404).json({ badRequest: false, msg: 'NO RESULT FOUND' });
        }
      }
    } else {
      res.status(400).json({ badRequest: true, msg: err.message });
    }
  });
};
