/* eslint-disable @typescript-eslint/no-explicit-any */
import {} from "jest";
import { DynamoConnector } from "../../../../../src/hexagonal/infrastructure/provider/aws/DynamoConnector";
const AWSMock = require("aws-sdk-mock");
const AWS = require("aws-sdk");

describe("Suite Gateway Provider", () => {
  const adapter = new DynamoConnector();

  beforeEach(() => {
    AWSMock.setSDKInstance(AWS);
  });

  afterEach(() => {
    AWSMock.restore("DynamoDB", "batchExecuteStatement");
    AWSMock.restore("DynamoDB.DocumentClient", "get");
    AWSMock.restore("DynamoDB.DocumentClient", "scan");
    AWSMock.restore("DynamoDB.DocumentClient", "put");
    AWSMock.restore("DynamoDB.DocumentClient", "delete");
    AWSMock.restore("DynamoDB.DocumentClient", "update");
    AWSMock.restore("DynamoDB.DocumentClient", "batchWrite");
    AWSMock.restore("DynamoDB.DocumentClient", "query");
    AWSMock.restore("DynamoDB.Converter", "unmarshall");
    AWSMock.restore("DynamoDB", "createTable");
    AWSMock.restore("DynamoDB", "deleteTable");
  });

  test("DynamoConnector ok", async () => {
    jest.restoreAllMocks();
    const arrayAdn = {
      adn: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
    };
    try {
      adapter.putMutantInfo(arrayAdn);
    } catch (e) {
      console.log("e", e);
    }
  });
});
