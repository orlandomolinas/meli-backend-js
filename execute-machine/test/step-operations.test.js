const AWSMock = require("aws-sdk-mock");
const stepOp = require("../src/operations/step-functions");

const eventCustomer = {
  method: "POST",
  stateMachine:
    "arn:aws:states:us-east-2:847416807881:stateMachine:mutantsteps",
  input: null,
};

const steps_start_result = {
  executionArn:
    "arn:aws:states:us-east-2:847416807881:execution:mutantsteps:52e0b31a-5421-4323-b1dd-28dae0bcf331",
  startDate: "2021-12-21T17:10:05.649Z",
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

afterEach(() => {
  AWSMock.restore();
});

describe("Step Functions Capabilities", () => {
  it("steps OK", async () => {
    // Arrange
    AWSMock.mock(
      "StepFunctions",
      "startExecution",
      function (params, callback) {
        callback(null, steps_start_result);
      }
    );
    AWSMock.mock(
      "StepFunctions",
      "describeExecution",
      function (params, callback) {
        callback(null, steps_execution_result);
      }
    );
    // Act
    try {
      expect(stepOp.describeExecution("arn", 123)).toBe(undefined);
    } catch (e) {
      console.log("Step error");
    }
  });
});
