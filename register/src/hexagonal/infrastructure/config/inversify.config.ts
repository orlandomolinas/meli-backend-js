import { Container } from "inversify";
import { SERVICES, ADAPTERS, CONTROLLERS } from "./Types";
import { MutantService } from "../../domain/port/api/MutantService";
import { StaticPropsMetadataReader } from "./StaticPropsMetadataReader";
import { MutantController } from "../../application/controller/MutantController";
import { MutantControllerImp } from "../../application/controller/http/MutantControllerImp";
import { MutantServiceImp } from "../../domain/service/MutantServiceImp";
import { MutantConnector } from "../../domain/port/spi/MutantConnector";
import { DynamoConnector } from "../provider/aws/DynamoConnector";

const AppContainer: Container = new Container();
AppContainer.applyCustomMetadataReader(new StaticPropsMetadataReader());
AppContainer.bind<MutantController>(CONTROLLERS.MutantController).to(
  MutantControllerImp
);
AppContainer.bind<MutantService>(SERVICES.MutantService).to(MutantServiceImp);
AppContainer.bind<MutantConnector>(ADAPTERS.MutantConnector).to(
  DynamoConnector
);

export { AppContainer };
