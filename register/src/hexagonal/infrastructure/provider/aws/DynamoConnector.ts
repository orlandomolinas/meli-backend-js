import { MutantConnector } from "../../../domain/port/spi/MutantConnector";
import { DB } from "../../../../utils/Constants";
import * as moment from "moment-timezone";
const AWS = require("aws-sdk");

let dynamoConnection = null;
let dynamodb = null;

export class DynamoConnector implements MutantConnector {
  public static readonly constructorInjections = [];
  public static readonly propertyInjections = [];

  async putMutantInfo(event: any): Promise<any> {
    console.log("putMutantInfo Dynamo init ", event);

    try {
      const timestamp = moment(new Date())
        .tz("America/Bogota")
        .format("YYYYMMDD");

      const item = {
        adn: event.adn.toString(),
        timestamp: Number(timestamp),
        state: event.isMutant,
      };
      const paramsPut = {
        TableName: DB.TABLE,
        Item: item,
      };

      console.log(`paramsPut: ${JSON.stringify(paramsPut)}`);
   return   await dynamoPut(paramsPut);

    } catch (error) {
      console.log("ERROR Dynamo: ", error);
      throw error;
    }
  }

}

const getDynamoClient = () => {
  if (!dynamoConnection) dynamoConnection = new AWS.DynamoDB.DocumentClient();
  return dynamoConnection;
};

const dynamoPut = (options) =>
  new Promise((resolve, reject) =>
    getDynamoClient().put(options, (err, data) =>
      err ? reject(err) : resolve(true)
    )
  );
