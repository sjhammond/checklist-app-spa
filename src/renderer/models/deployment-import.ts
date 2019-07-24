import { Deployment } from "./deployment";
import { DeploymentItem } from "./deployment-item";

export interface DeploymentImport {
    deployment: Deployment;
    deploymentItems: (DeploymentItem)[];
}