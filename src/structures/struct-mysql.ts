/** Structures for datas related to mysql2 query results
 * @module structures/mysql
 * */

import mysql from 'mysql2';

/**
 * An alias for MySQL2 query result (on success), consist of
 * `RowDataPacket[]` | `RowDataPacket[][]` | `OkPacket` | `OkPacket[]` | `ResultsSetHeader`
 * @name MySQLQueryResult
 * @type
 * @memberof module:structures/mysql
 * */
export type MySQLQueryResult =
  | mysql.RowDataPacket[]
  | mysql.RowDataPacket[][]
  | mysql.OkPacket
  | mysql.OkPacket[]
  | mysql.ResultSetHeader;
