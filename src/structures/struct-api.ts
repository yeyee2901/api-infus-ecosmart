/** Structures for datas related to mysql2 query results
 * @module structures/struct-api
 * */

import mysql from 'mysql2';

/**
 * An alias for MySQL2 query result (on success), consist of
 * `RowDataPacket[]` | `RowDataPacket[][]` | `OkPacket` | `OkPacket[]` | `ResultsSetHeader`
 * @name MySQLQueryResult
 * @type
 * @memberof module:structures/struct-api
 * */
export type MySQLQueryResult =
  | mysql.RowDataPacket[]
  | mysql.RowDataPacket[][]
  | mysql.OkPacket
  | mysql.OkPacket[]
  | mysql.ResultSetHeader;


/**
 * Defines the error status code.
 * @name ErrorType
 * @memberof module:structures/struct-api
 * @enum
 * - `RequestError`: the user request invalid route (404), in this case, user
 *   should check the API route they're requesting. This error should only appear on NOT FOUND route.
 * - `DatabaseError`: error from the database side (500), in this case, user should
 *   check the query string in controller & database. This also includes INSERT fail & UPDATE fail.
 * - `NoResultError`: when the records requested in the query returns an array of length 0. In this case,
 *   this means the data doesn't exists yet. Logics behind checking this error should be handled on
 *   the client side.
 */
/* eslint-disable */
export enum APIErrorType {
  RequestError,
  DatabaseError,
  NoResultError
}
/* eslint-enable */
