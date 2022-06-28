/* eslint-disable max-len */
/* eslint-disable no-undef */
const index = require("../src/index.js");
const stepOp = require("../src/operations/step-functions");

const event = {
  adn: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
  body: '{\n  "adn": ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]\n}',
  isBase64Encoded: false,
};
const star = {
  executionArn:
    "arn:aws:states:us-east-1:123:execution:isMutantMachine:4a6d7f8c-78a3-4124-be08-fb27a1050912",
  startDate: "2022-06-28T02:57:40.527Z",
};
const steps_execution_result = {
  executionArn:
    "arn:aws:states:us-east-1:2:execution:isMutantMachine:13d704b7-d991-42e9-be2c-53999c688d7a",
  stateMachineArn: "arn:aws:states:us-east-1:2:stateMachine:isMutantMachine",
  name: "13d704b7-d991-42e9-be2c-53999c688d7a",
  status: "SUCCEEDED",
  startDate: "2022-06-28T02:59:45.338Z",
  stopDate: "2022-06-28T02:59:47.425Z",
  input: '{"adn":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]}',
  inputDetails: {
    included: true,
  },
  output:
    '{"adn":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"],"power":"true","isMutant":{"statusCode":200,"isMutant":true,"body":"Success"}}',
  outputDetails: {
    included: true,
  },
};

describe("Suite index success", () => {
  it("Test line 132-133", async () => {
    jest.spyOn(stepOp, "startExecution").mockImplementation(() => star);
    jest
      .spyOn(stepOp, "describeExecution")
      .mockImplementation(() => steps_execution_result);
    try {
      await index.handler(event);
    } catch (err) {
      expect(err).toEqual("error");
    }
  });
  it("Invalid Resource - Exception", async () => {
    try {
      await index.handler(undefined);
    } catch (err) {
      expect(err).toEqual("error");
    }
  });
});
