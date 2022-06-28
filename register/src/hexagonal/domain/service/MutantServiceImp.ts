/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutantService } from "../port/api/MutantService";
import { MutantConnector } from "../port/spi/MutantConnector";

export class MutantServiceImp implements MutantService {
  public static readonly constructorInjections = ["MutantConnector"];
  public static readonly propertyInjections = [];

  public connector: MutantConnector;

  constructor(MutantConnector: MutantConnector) {
    this.connector = MutantConnector;
  }

  async putMutantInformation(event: any): Promise<boolean> {
    console.log("putMutantInformation", event);
    return await this.connector.putMutantInfo(event);
  }
}
