import { mysqlGetData } from '../model/model-infus';
import { IInfusData } from '../structures/struct-infus';
import { Request, Response } from 'express';

/**
 * Handler function used to get all infus records from `infus_table`. Sends JSON as a response.
 * @function
 * @name getInfusNames
 * @param {Request} _req - request object from Express
 * @param {Response} res - response object from Express
 * */
export const getInfusNames = (_req: Request, res: Response): void => {
  const database = `infus`;
  const table = `infus_table`;
  const query = `SELECT * FROM ${table}`;

  mysqlGetData(database, query, (qres, qerr) => {
    if (!qerr) {
      if (Array.isArray(qres)) {
        if (qres as IInfusData[]) {
          res.json(qres);
        }
      }
    }else{
      res.json({msg: qerr.message})
    }
  });
};
