import { ProductTier } from "../models/product-tier";
import { dateOptions } from "./helpers/dateOptions";
import { dbPromise } from "../data/db";
import { addDeploymentListEventListeners } from "./deploymentListEvents";
import { getAllFromObjectStore, getItemsByDeploymentId } from "./helpers/dbFunctions";
import { scrollToTop } from "./helpers/scrollToTop";
import { Deployment } from "../models/deployment";
import { Step } from "../models/step";
import { DeploymentItem } from "../models/deployment-item";


let numberOfDeployments: number;

export const renderDeploymentList = () => {
    
    //reset scroll postiion of main-content component
    scrollToTop(); 

    let deploymentData = '';
    
    dbPromise().then(async db => {
        //get all deployment data
        const deployments = await getAllFromObjectStore('deployments', db)
        //get the number of deployments
        numberOfDeployments = deployments.length;
        //open a cusrsor in deployments to iterate through the data
        const cursor = await db
            .transaction(['deployments'], 'readonly')
            .objectStore('deployments')
            .index("dateModified")
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
                            <button id="deployment${cursor.value.id}__edit" type="button" title="Edit" class="deployment-btn edit-btn" data-id="${cursor.value.id}">
                                <svg class="deployment-button_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
                                </svg>    
                            </button>
                            <button id="deployment${cursor.value.id}__print" type="button" title="Print" class="deployment-btn print-btn" data-id="${cursor.value.id}">
                                <svg class="deployment-button_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>
                                </svg>
                            </button>
                            <button id="deployment${cursor.value.id}__delete" type="button" title="Delete" class="deployment-btn delete-btn" data-id="${cursor.value.id}">
                                <svg class="deployment-button_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/><path fill="none" d="M0 0h24v24H0z"/>
                                </svg>
                            </button>
                        </div>
                        <div class="deployment-product">
                            XProtect&reg; ${(cursor.value.productTier < 4) ? ProductTier[cursor.value.productTier] + "+" : ProductTier[cursor.value.productTier]} - <span id="completion-pct__${cursor.value.id}"></span>% complete
                        </div>
                        <div class="deployment-details">
                            <div class="deployment-detail">Integrator:<span>${cursor.value.integrator}</span></div>
                            <div class="deployment-detail">Last modified:<span>${(cursor.value.dateModified).toLocaleString('default', dateOptions)}</span></div>
                            <div class="deployment-detail">Created on:<span>${(cursor.value.dateCreated).toLocaleString('default', dateOptions)}</span></div>
                        </div>
                    </div>    
                </div>
            `
            calculateCompletion(cursor.value); 

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
                    <h1 class="title"> Load deployment</h1>
                    <div id="deployment-list__body">
                        ${data}
                    </div>
            </div>
        `
    } else {
        return `
            <div id="no-deployments">
                <h2>No deployments found.</h2> Select <b>New deployment</b> to get started.
            </div>
        `
    }
}

const calculateCompletion = async (cursor:Deployment) => {

    dbPromise().then(async db => {
        let totalItemsForProduct: DeploymentItem [] = [];
        const steps = await getAllFromObjectStore("steps", db) as Step[]; 
        const items = await getItemsByDeploymentId(cursor.id.toString(), db);
        const stepsForProduct = steps.filter(step => step.productTier <= cursor.productTier)

        stepsForProduct.forEach(step => {
            let partialArray = items.filter(item => item.stepId == step.id);
            totalItemsForProduct = totalItemsForProduct.concat(partialArray);
        })

        const completedItemsForProduct = totalItemsForProduct.filter(item => item.itemState != 0);
        const pct = Math.round((completedItemsForProduct.length / totalItemsForProduct.length) * 100).toString();
        return pct;
    }).then(pct => {
        const span = document.getElementById(`completion-pct__${cursor.id}`);
        span.innerHTML += pct; 
    })
}