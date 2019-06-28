import { ProductTier } from "../models/product-tier";
import { dateOptions } from "./helpers/dateOptions";
import { dbPromise } from "../data/db";
import { addDeploymentListEventListeners } from "./deploymentListEvents";
import { getAllFromObjectStore } from "./helpers/dbFunctions";
import { scrollToTop } from "./helpers/scrollToTop";

let deploymentData = '';
let numberOfDeployments: number;

export const renderDeploymentList = () => {
    
    //reset scroll postiion of main-content component
    scrollToTop(); 

    deploymentData = '';
    
    dbPromise().then(async db => {
        //get all deployment data
        const deployments = await getAllFromObjectStore('deployments', db)
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
                    <div class="deployment-info">
                        <div class="deployment-name">${cursor.value.name}</div>
                        <div class="deployment-button-container">
                            <button id="deployment${cursor.value.id}__edit" type="button" class="edit-btn" data-id="${cursor.value.id}">Edit</button>
                            <button id="deployment${cursor.value.id}__print" type="button" class="print-btn" data-id="${cursor.value.id}">Print</button>
                            <button id="deployment${cursor.value.id}__delete" type="button" class="delete-btn" data-id="${cursor.value.id}">Delete</button>
                        </div>
                        <div class="deployment-product">XProtect ${(cursor.value.productTier < 4) ? ProductTier[cursor.value.productTier] + "+" : ProductTier[cursor.value.productTier]}</div>
                        <div class="deployment-details">
                            <div class="deployment-detail">Integrator:<span>${cursor.value.integrator}</span></div>
                            <div class="deployment-detail">Last modified:<span>${(cursor.value.dateModified).toLocaleString('default', dateOptions)}</span></div>
                            <div class="deployment-detail">Created on:<span>${(cursor.value.dateCreated).toLocaleString('default', dateOptions)}</span></div>
                        </div>
                    </div>    
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
                    <h1 class="title" id="deployment-list__title"> Select a Deployment</h1>
                    <div id="deployment-list__body">
                        ${data}
                    </div>
            </div>
        `
    } else {
        return `
            <div id="no-deployments">
                <h2>No deployments found.</h2> Select <a id="new-deployment-link" href="#"><b>New Deployment</b></a> to get started.
            </div>
        `
    }
}

  