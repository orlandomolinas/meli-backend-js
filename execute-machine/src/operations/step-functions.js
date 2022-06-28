const AWS = require("aws-sdk");

const startExecution = async (stateMachine, input) => {
  try {
    const stepfunctions = new AWS.StepFunctions();
    const result = await stepfunctions
      .startExecution({
        stateMachineArn: stateMachine,
        input: JSON.stringify(input),
      })
      .promise();

    return result ? result : null;
  } catch (e) {
    throw e;
  }
};

const describeExecution = async (stateMachine, sfnId) => {
  try {
    const param = {
      executionArn: `${stateMachine}:${sfnId}`,
    };

    const stepfunctions = new AWS.StepFunctions();
    const result = await stepfunctions.describeExecution(param).promise();

    return result;
  } catch (error) {
    console.log(`Error processing request ${error.message}`);
    throw error;
  }
};

module.exports = {
  startExecution,
  describeExecution,
};
