import { MutantServiceImp } from "../../../../src/hexagonal/domain/service/MutantServiceImp";
import { DynamoConnector } from "../../../../src/hexagonal/infrastructure/provider/aws/DynamoConnector";

const mutantValidation = new DynamoConnector();

const service = new MutantServiceImp(mutantValidation);

const event = {
  adn: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
};

describe("Test service", () => {
  jest.restoreAllMocks();


  jest
    .spyOn(mutantValidation, "putMutantInfo")
    .mockImplementation(() => Promise.resolve(true));

  test("service OK ", async () => {
    const response = await service.putMutantInformation(event);
    if (response != null) expect(response).toBe(true);
  });
});

