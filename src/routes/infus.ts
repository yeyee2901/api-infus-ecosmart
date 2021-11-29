import express from 'express';
import {
  queryData,
  IInfusData as _InfusData
} from '../controller/controller_infus';

const router = express.Router();

// DB info
const host = `abimanyu.eng.wima.ac.id`;
const user = `5103018003`;
const password = `5103018003`;
const database = `5103818003`;
const table = `coba_image`;
const query = `SELECT * FROM ${table}`;

router.route('/infus/:id').get((_request, response) => {
  queryData(host, user, password, database, query, result_array => {
    console.log(result_array);
    response.send(`Helloo`);
    // // check if result is array of records
    // if( Array.isArray(result_array) ){
    //   const result = result_array[0]

    //   // assert the type
    //   if( (result as IInfusData).id ){
    //     const dataInfus = result as IInfusData
    //     console.log(dataInfus);
    //     dataInfus.id = 1
    //     dataInfus.stringBlob = `hello`
    //     console.log(dataInfus);
    //     response.json({ id: dataInfus.id, stringBlob: dataInfus.stringBlob })
    //   }
    // }else{
    //   response.json({ msg: 'No Data!' }).status(401)
    // }
  });
});

export default router;
