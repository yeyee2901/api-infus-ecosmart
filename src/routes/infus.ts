import express from 'express';
import { mysqlGetData, IInfusData } from '../controller/controller_infus';

const router = express.Router();

// DB info, todo: move to ENV
const host = `localhost`;
const user = `yeyee`;
const password = `shredder555`;
const database = `infus`;
const table = `infus_table`;
const query = `SELECT * FROM ${table}`;

router.route('/infus/:id').get((_request, response) => {
  mysqlGetData(host, user, password, database, query, (resultArray) => {

    // check if result is array type or an instance of record
    if (Array.isArray(resultArray)) {
      // assert the type
      if ((resultArray[0] as IInfusData).id) {

        const dataInfus = resultArray as IInfusData[];
        response.json(dataInfus);
      }
    } else {
      response.json({ msg: 'No Data!' }).status(401);
    }
  });
});

export default router;
