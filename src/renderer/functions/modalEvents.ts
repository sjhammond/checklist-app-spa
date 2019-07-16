import $ from 'jquery'
import { dbPromise } from '../data/db';
import { renderDeploymentList } from './deploymentListBuilder';

export const addModalEventListeners = (id: string) => {

    //delete event
    $('#modal__delete-button').click(async function () {
        const modal = document.getElementById("modal");
        await deleteDeployment(id);
        modal.style.display = 'none';

    })

    //close modal on cancel
    $('#modal__cancel-button').click(function () {
        const modal = document.getElementById("modal");
        modal.style.display = 'none';
    })
}

const deleteDeployment = (id: string) => {
    let deploymentId = parseInt(id);

    //delete the deployment from deployments db store
    dbPromise()
        .then(async db => {

            await db
                .transaction('deployments', 'readwrite')
                .objectStore('deployments')
                .delete(deploymentId);

            //get the items associated with the deployment
            const items = await db
                .transaction('deployment-items', 'readwrite')
                .objectStore('deployment-items')
                .index('deploymentId')
                .getAllKeys(deploymentId);

            //delete each item for the deployment from deployment-items db store
            for (const item of items) {
                await db
                    .transaction('deployment-items', 'readwrite')
                    .objectStore('deployment-items')
                    .delete(item);
            }
        })

    //remove the element from the table
    const el = document.getElementById('deployment' + id.toString());
    el.remove();

    //check if there are no more delpoyments - if there aren't display the 'no deployments' message
    const deploymentListLength = document.getElementsByClassName('deployment');
    if (deploymentListLength.length === 0) {
        renderDeploymentList();
    }
}