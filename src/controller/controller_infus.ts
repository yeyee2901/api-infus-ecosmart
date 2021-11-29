import mysql from 'mysql2';

export type MySQLQueryResult =
  | mysql.RowDataPacket[]
  | mysql.RowDataPacket[][]
  | mysql.OkPacket
  | mysql.OkPacket[]
  | mysql.ResultSetHeader;

export interface IInfusData extends mysql.RowDataPacket {
  id: number;
  namaInfus: string;
}

export const mysqlGetData = (
  host: string,
  user: string,
  password: string,
  database: string,
  query: string,
  onSuccess: (queryResult: MySQLQueryResult) => void
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

    onSuccess(queryResult);
  });
};
