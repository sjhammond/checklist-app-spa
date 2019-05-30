import $ from 'jquery'; 
import { renderDeploymentList } from "./deploymentListBuilder";
import { dbPromise } from "../data/db";
import { renderChecklist } from "./checklistBuilder";

export const deleteDeployment = (id: number): any => {

    //confirm delete
    const c = confirm('Are you sure you want to delete this deployment?')
  
    //if OK to delete, delete from indexedDB object store 
    if (c == true) {
      dbPromise().then(async db => {
  
        //delete the deployment from deployments db store
        await db
          .transaction('deployments', 'readwrite')
          .objectStore('deployments')
          .delete(id);
  
        //get the items associated with the deployment
        const items = await db
          .transaction('deployment-items', 'readwrite')
          .objectStore('deployment-items')
          .index('deploymentId')
          .getAllKeys(id);
  
        //delete each item for the deployment from deployment-items db store
        for (const item of items) {
          await db
            .transaction('deployment-items', 'readwrite')
            .objectStore('deployment-items')
            .delete(item);
        }
      });
  
      //remove the element from the table
      const el = document.getElementById('deployment' + id.toString());
      el.remove();
  
      //check if there are no more delpoyments - if there aren't display the 'no deployments' message
      const deploymentListLength = document.getElementsByClassName('deployment');
      if (deploymentListLength.length === 0) {
        renderDeploymentList();
      }
      event.stopPropagation();
    }
  }

  export const addDeploymentListEventListeners = async () => {
    //add delete functionality to each delete button in the table 
    $('.delete-btn').click(async function (){
      event.stopPropagation();
      const deploymentId = parseInt(this.dataset.id);
      deleteDeployment(deploymentId);
    })
  
    //add the "go to Checklist" click event to each table row
    $('.deployment').click(async function () {
      const deploymentId = parseInt(this.dataset.id);
      const id = deploymentId.toString();
      renderChecklist(id);
    })
  }