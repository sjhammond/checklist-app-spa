import {ItemState} from './item-state'

export class DeploymentItem {
    id?: number;
    deploymentId: number;
    stepId: number;
    itemState: ItemState;
    integrator: string;
    date: Date;
    note: string;
    noteIntegrator: string;
    noteDate: Date;
}