import { DBSchema } from 'idb';
import { Phase } from './phase';
import { Task } from './task';
import { Step } from './step';
import { Deployment } from './deployment';
import { DeploymentItem } from './deployment-item';

export interface MilestoneDB extends DBSchema {
  'deployments': {
    key: number,
    value: Deployment,
    indexes: {
      'dateModified': Date
    };
  },
  'phases': {
    key: number,
    value: Phase,
    indexes: {
      'title': string
    }
  }
  'tasks': {
    key: number,
    value: Task,
    indexes: {
      'phaseId': number
    }
  },
  'steps': {
    key: number,
    value: Step,
    indexes: {
      'taskId': number
    }
  }
  'deployment-items':{
    key: number,
    value: DeploymentItem,
    indexes: {
      'deploymentId': number,
      'stepId': number
    }
  }
}
