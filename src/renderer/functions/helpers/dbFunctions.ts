import { MilestoneDB } from "../../models/milestone-db";
import { DeploymentItem } from "../../models/deployment-item";
import { Deployment } from "../../models/deployment";
import { IDBPDatabase } from "idb";

export const getDeployment = (id:string, db:IDBPDatabase<MilestoneDB>) => {
    return db    
        .transaction('deployments', 'readonly')
        .objectStore('deployments')
        .get(parseInt(id));
}

export const getItemsByDeploymentId = (id:string, db:IDBPDatabase<MilestoneDB>) => {
    return db
        .transaction('deployment-items', 'readonly')
        .objectStore('deployment-items')
        .index('deploymentId')
        .getAll(parseInt(id)); 
}

export const updateDeploymentItem = (data:DeploymentItem, db:IDBPDatabase<MilestoneDB>) => {
    return db
        .transaction('deployment-items', 'readwrite')
        .objectStore('deployment-items')
        .put(data);
}

export const updateDeploymentModifiedDate = (deployment:Deployment, db:IDBPDatabase<MilestoneDB>) => {
    const data = {
        id: deployment.id,
        name: deployment.name,
        productTier: deployment.productTier,
        integrator: deployment.integrator,
        currentPhaseId: deployment.currentPhaseId,
        dateCreated: deployment.dateCreated,
        dateModified: new Date() 
    }

    return db
        .transaction('deployments','readwrite')
        .objectStore('deployments')
        .put(data)
}

export const getAllFromObjectStore = (store:any, db:IDBPDatabase<MilestoneDB>) => {
    return db
        .transaction(store, 'readonly')
        .objectStore(store)
        .getAll()
}