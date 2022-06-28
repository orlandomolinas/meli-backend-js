/* eslint-disable require-jsdoc */
/* eslint-disable no-console */
const machineOp = require("./operations/step-functions");

exports.handler = async (event) => {
  console.log("event: ", event);

  try {
    const adn = JSON.parse(event["body"]);
    console.log("adn ", JSON.stringify(adn));
    const stepDataIni = await machineOp.startExecution(
      "arn:aws:states:us-east-1:156090219506:stateMachine:isMutantMachine",
      adn
    );
    console.log("stepDataIni ", JSON.stringify(stepDataIni));
    const id = stepDataIni.executionArn.split(":");
    const stepFunctionId = id[id.length - 1];

    console.log(`stepFunctionId ${stepFunctionId}`);

    const data = {
      sfnId: stepFunctionId,
    };
    let stepData = "";
    do {
      stepData = await machineOp.describeExecution(
        "arn:aws:states:us-east-1:156090219506:execution:isMutantMachine",
        data.sfnId
      );
      console.log(`stepData ${stepData["stepData"]}`);
      console.log(`status ${stepData["status"]}`);

      if (stepData["status"] === "FAILED" || stepData["status"] === undefined)
        throw { status: 500, reason: "Servicio no encontrado" };
    } while (typeof stepData["output"] === "undefined");

    console.log(`Services stepData ${JSON.stringify(stepData)}`);

    const responseData = JSON.parse(stepData["output"]);

    const response = {
      statusCode: 200,
      body: JSON.stringify(responseData),
    };
    return response;
  } catch (error) {
    console.log(`error -> ${error}`);
    return {
      statusCode: 401,
      message: error.message,
    };
  }
};
