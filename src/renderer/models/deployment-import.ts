export interface DeploymentImport {
    deployment: Deployment;
    deploymentItems: (DeploymentItemsEntity)[];
}

export interface Deployment {
    name: string;
    productTier: number;
    integrator: string;
    currentPhaseId: number;
    dateCreated: Date;
    dateModified: Date;
}

export interface DeploymentItemsEntity {
    stepId: number;
    itemState: number;
    itegrator: string;
    date: Date;
    note: string;
    noteDate: Date;
    noteIntegrator: string;
}
