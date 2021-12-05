import mysql from 'mysql2';
import { MySQLQueryResult } from '../structures/struct-api';

const host = process.env.DB_HOST as string;
const user = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD as string;

/**
 * Used to query any data from the database (database should be specifed on .env file). Specify callback handler to determine what to do with the result / error.
 * @function
 * @name mysqlGetData
 * @param {string} database - target database
 * @param {string} query - string query to execute
 * @param {function} handleResult - Callback function executed when the query finishes, receives the query result & QueryError (if any) as a parameter.
 * */
export const mysqlQuery = (
  database: string,
  query: string,
  handleResult: (
    _queryResult: MySQLQueryResult,
    _err: mysql.QueryError | null
  ) => void
) => {
  const dbConn = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  dbConn.query(query, (err, queryResult) => {
    handleResult(queryResult, err);
  });

  dbConn.end();
};
