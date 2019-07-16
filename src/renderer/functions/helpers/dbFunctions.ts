import { MilestoneDB } from "../../models/milestone-db";
import { DeploymentItem } from "../../models/deployment-item";
import { Deployment } from "../../models/deployment";
import { IDBPDatabase } from "idb";


//get a deployment by its id
export const getDeployment = (id: string, db: IDBPDatabase<MilestoneDB>) => {
    return db
        .transaction('deployments', 'readonly')
        .objectStore('deployments')
        .get(parseInt(id));
}

//get all the deployment items for a given deployment id 
export const getItemsByDeploymentId = (id: string, db: IDBPDatabase<MilestoneDB>) => {
    return db
        .transaction('deployment-items', 'readonly')
        .objectStore('deployment-items')
        .index('deploymentId')
        .getAll(parseInt(id));
}

//update a deployment-item
export const updateDeploymentItem = (data: DeploymentItem, db: IDBPDatabase<MilestoneDB>) => {
    return db
        .transaction('deployment-items', 'readwrite')
        .objectStore('deployment-items')
        .put(data);
}

//update a deployment
export const updateDeployment = (data: Deployment, db: IDBPDatabase<MilestoneDB>) => {
    return db
        .transaction('deployments', 'readwrite')
        .objectStore('deployments')
        .put(data);
}

//update the modified date of the deployment (should be done whenver a change is made)
export const updateDeploymentModifiedDate = (deployment: Deployment, db: IDBPDatabase<MilestoneDB>) => {
    const data = {
        id: deployment.id,
        name: deployment.name,
        productTier: deployment.productTier,
        integrator: deployment.integrator,
        currentPhaseId: deployment.currentPhaseId,
        dateCreated: deployment.dateCreated,
        dateModified: new Date() //update date
    }

    return db
        .transaction('deployments', 'readwrite')
        .objectStore('deployments')
        .put(data);
}

//get all the items from the specified object store
export const getAllFromObjectStore = (store: any, db: IDBPDatabase<MilestoneDB>) => {
    return db
        .transaction(store, 'readonly')
        .objectStore(store)
        .getAll();
}
