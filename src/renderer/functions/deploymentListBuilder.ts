import $ from 'jquery';
import { ProductTier } from "../models/product-tier";
import { dateOptions } from "./helpers/dateOptions";
import { dbPromise } from "../data/db";
import { deleteDeployment } from "./deploymentListEvents";

let deploymentData = '';
let numberOfDeployments: number;

export const renderDeploymentList = () => {

    dbPromise().then(async db => {
        //get all deployment data
        const deployments = await db
            .transaction('deployments', 'readonly')
            .objectStore('deployments')
            .getAll();
        //get the number of deployments
        numberOfDeployments = deployments.length;
        //open a cusrsor in deployments to iterate through the data
        const cursor = await db
            .transaction(['deployments'], 'readonly')
            .objectStore('deployments')
            .openCursor(undefined, 'prev');
        return cursor;
    }).then(async cursor => {
        // iterate through the cursor and display each item in the object store
        while (cursor) {
            //if the cursor is undefined (ie no more items found), escape
            if (!cursor) {
                return;
            }
            //otherwise, build a table row for each deployment in the store
            deploymentData += `
                <div class="deployment" id="deployment${cursor.value.id}" data-id="${cursor.value.id}">
                    <div>${cursor.value.name}</div>
                    <div>${(cursor.value.productTier < 4) ? ProductTier[cursor.value.productTier] + "+" : ProductTier[cursor.value.productTier]}</div>
                    <div>${cursor.value.integrator}</div>
                    <div>Last Modified: ${(cursor.value.dateModified).toLocaleString('default', dateOptions)}</div>
                    <div>Created: ${(cursor.value.dateCreated).toLocaleString('default', dateOptions)}</div>
                    <button id="deployment${cursor.value.id}__edit" type="button" class="edit-btn" data-id="${cursor.value.id}">Edit</button>
                    <button id="deployment${cursor.value.id}__delete" type="button" class="delete-btn" data-id="${cursor.value.id}">Delete</button>
                </div>
            `
            //step through the cursor to the next item
            cursor = await cursor.continue();
        }
    }).then(() => {
        const main = document.getElementById('main-content');
        main.innerHTML = finalizeDeploymentList(deploymentData);
        addDeploymentListEventListeners();
    })
}

export const finalizeDeploymentList = (data: string): string => {
    if (numberOfDeployments > 0) {
        return `
            <div id="deployment-list">
                <div id="deployment-list">
                    <span> Select a Deployment</span>
                    <div id="deployment-list__body">
                        ${data}
                    </div>
                </div>
            </div>
        `
    } else {
        return `
            <div id="no-deployments">
                No deployments found. Select <b>Create New Deployment</b> to get started.
            </div>
        `
    }
}

const addDeploymentListEventListeners = async () => {
    //add delete functionality to each delete button in the table 
    $('.delete-btn').click(async function (){
      event.stopPropagation();
      const deploymentId = parseInt(this.dataset.id);
      deleteDeployment(deploymentId);
    })
  
    //add the "go to Checklist" click event to each table row
    $('.deployment').click(async function () {
      const deploymentId = parseInt(this.dataset.id);
      const href = `./checklist.html?id=${deploymentId}`;
      window.location.href = href;
    })
  }

  