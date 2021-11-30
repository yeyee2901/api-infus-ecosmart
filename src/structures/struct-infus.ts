/** Structures for datas related to infus
 * @module structures/infus
 * */

import mysql from 'mysql2';

/** Used to shape the query result from any `infus` table (as a base)
 * @name IInfusData
 * @interface
 * @field {number} id - ID of the infus
 * @field {string} namaInfus - name of infus or the infusion fluid name
 * @memberof module:structures/infus
 * */
export interface IInfusData extends mysql.RowDataPacket {
  id: number;
  namaInfus: string;
}

/** Used to shape the infus measurement query result from `infus_measurement` table
 * @name IInfusVolmeasurement
 * @interface
 * @field {number} `volumeLoadCell: number`, volume measured using load cell in mL (mili-liters)
 * @field `volumeCV: number`, volume "estimated" from computer vision in mL (mili-liters)
 * @memberof module:structures/infus
 * */
export interface IInfusVolMeasurement extends IInfusData {
  volumeLoadCell: number;
  volumeCV: number;
}
