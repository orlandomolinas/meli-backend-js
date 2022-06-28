import { MutantControllerImp } from "../src/hexagonal/application/controller/http/MutantControllerImp";

const index = require("../src/index");
const event = {
  adn: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
};

describe("Suite index success", () => {
  test("event handler validation 1", async () => {
    jest.restoreAllMocks();
    jest
      .spyOn(MutantControllerImp.prototype as any, "putMutantInformation")
      .mockImplementation(() => Promise.resolve(true));

    const resp = await index.handler(event);
    expect(resp.statusCode).toStrictEqual(200);
  });
});

describe("Suite index bad", () => {
  test("event handler validation 2", async () => {
    jest.restoreAllMocks();
    jest
      .spyOn(MutantControllerImp.prototype as any, "putMutantInformation")
      .mockImplementationOnce(() => Promise.reject(new Error("Error")));

    const resp = await index.handler(event);
    expect(resp.statusCode).toStrictEqual(500);
  });
});
