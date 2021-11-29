import mysql from 'mysql2';

export type MySQLResult =
  | mysql.RowDataPacket[]
  | mysql.RowDataPacket[][]
  | mysql.OkPacket
  | mysql.OkPacket[]
  | mysql.ResultSetHeader;

export interface IInfusData extends mysql.RowDataPacket {
  id: number;
  stringBlob: string;
}

export const queryData = (
  host: string,
  user: string,
  password: string,
  database: string,
  query: string = 'SELECT * FROM coba_image',
  callback: (queryResult: MySQLResult) => void
) => {
  const dbConn = mysql.createConnection({
    host,
    user,
    password,
    database
  });

  dbConn.query(query, (err, queryResult) => {
    if (err) {
      return err;
    }
    callback(queryResult);
  });
};
