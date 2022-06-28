/* eslint-disable @typescript-eslint/no-explicit-any */
import "reflect-metadata";
import { CONTROLLERS } from "./hexagonal/infrastructure/config/Types";
import { AppContainer } from "./hexagonal/infrastructure/config/inversify.config";
import { MutantController } from "./hexagonal/application/controller/MutantController";
import { Response } from "../src/hexagonal/domain/model/response";

let controller: MutantController;
const response: Response = {
  statusCode: 200,
  registed: false,
  body: "Success",
  isMutant: false,
};
export const handler = async (event: any, context: any): Promise<any> => {
  try {
    console.log(`Initializing isMutant ${JSON.stringify(event)}`);

    controller = AppContainer.get<MutantController>(
      CONTROLLERS.MutantController
    );

    const result: boolean = await controller.putMutantInformation(event);

    response.statusCode = 200;
    response.registed = result;
    response.isMutant = event.isMutant == "true";

    console.log("Reg ", response);
    return response;
  } catch (error) {
    console.log("Error Mutant Inquiry Response:", error);

    response.statusCode = 500;
    response.body = JSON.stringify(error);

    return response;
  }
};
