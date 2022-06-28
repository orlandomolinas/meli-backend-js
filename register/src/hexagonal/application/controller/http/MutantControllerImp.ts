import { MutantService } from "../../../domain/port/api/MutantService";
import { MutantController } from "../MutantController";

export class MutantControllerImp implements MutantController {
  public static readonly constructorInjections = ["MutantService"];
  public static readonly propertyInjections = [];

  public _mutantValidationService: MutantService;

  constructor(MutantService: MutantService) {
    this._mutantValidationService = MutantService;
  }

  public async putMutantInformation(event: any): Promise<boolean> {
    try {
      console.log(`Initializing controller`);

      return this._mutantValidationService.putMutantInformation(event);
    } catch (error) {
      console.log(`Controller - General Error: ${error.message}`, error);
      throw error;
    }
  }
}
