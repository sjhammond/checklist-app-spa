import { Deployment } from "../models/deployment";
import { dbPromise } from "../data/db";
import { getDeployment, getItemsByDeploymentId, getAllFromObjectStore } from "./helpers/dbFunctions";
import { DeploymentItem } from "../models/deployment-item";
import { Phase } from "../models/phase";
import { Task } from "../models/task";
import { Step } from "../models/step";
import { ProductTier } from "../models/product-tier";
import { dateOptions } from "./helpers/dateOptions";
import { buildStatus, buildNoteStatus } from "./checklistBuilder";
import { scrollToTop } from "./helpers/scrollToTop";


export const renderPrintView = (id:string) => {
    let deployment:Deployment;
    let phases:Phase[]; 
    let tasks:Task[];
    let steps:Step[];
    let items:DeploymentItem[]; 
    let mainContent = '';
    
    //reset scroll postiion of main-content component
    scrollToTop();

    dbPromise().then(async db => {

        //get the deployment
        deployment = await getDeployment(id, db);

        //start with the print heading HTML
        mainContent = buildPrintHeader(deployment); 

        //get all the phases, tasks, and steps for building the list
        phases = await getAllFromObjectStore('phases', db); 
        tasks = await getAllFromObjectStore('tasks', db);      
        steps = await getAllFromObjectStore('steps', db)

        //filter tasks and steps by product tier before passing into the renderer
        tasks = tasks.filter(task => task.productTier.valueOf() <= deployment.productTier.valueOf());
        steps = steps.filter(step => step.productTier.valueOf() <= deployment.productTier.valueOf());
        
        //get all the item data for the deployment
        items = await getItemsByDeploymentId(id, db);
        
        //iterate through the phases to build the print view
        //pass in the tasks, steps, and items -- these will be filtered down later
        for (const phase of phases) {
           mainContent += buildPhaseForPrint(phase, tasks, steps, items)
        }

        //when the loop completes, return the html
        return mainContent;
    }).then(mainContent => {

        //add a closing div tag for print-view
        mainContent += `</div>`

        //render html in the app container
        document.getElementById('main-content').innerHTML = mainContent;
    })
}

const buildPrintHeader = (deployment:Deployment) => {
    return `
        <div id="print-view">
            <header id="pv__deployment-info">
                <div id="pv__deployment-name"> 
                    Deployment Name:<span>${deployment.name}</span>
                </div>
                <div id="pv__deployment-product">
                    Product:<span>XProtect&reg; ${(deployment.productTier < 4) ? ProductTier[deployment.productTier] + "+" : ProductTier[deployment.productTier]}</span>
                </div>
                <div id="pv__deployment-modified">
                    Last modified:<span>${(deployment.dateModified).toLocaleString('default', dateOptions)}</span>
                </div>
                <div id="pv__print-date">
                    Printed on:<span>${new Date().toLocaleString('default', dateOptions)}</span>
                </div>
            </header>
    `
}

const buildPhaseForPrint = (phase:Phase, tasks:Task[], steps:Step[], items:DeploymentItem[]) => {
    const phaseTasks = tasks.filter(task => task.phaseId == phase.id); 

    return `
        <div class="pv__phase">
            <div class="pv__phase-title">${phase.title}</div>
            <ul class="pv__phase-tasks">
                ${phaseTasks
                    .map(task => {return buildTaskForPrint(task, steps, items)})
                    .join('')
                }
            </ul>
        </div>
    `
}

const buildTaskForPrint = (task:Task, steps:Step[], items:DeploymentItem[]) => {
    const taskSteps = steps.filter(step => step.taskId == task.id); 

    return `
        <li class="pv__task">
            <div class="pv__task-title">${task.title}</div>
            <span class="pv__task-line"></span>
            <ul class="pv__task-steps">
                ${taskSteps
                    .map(step => buildStepForPrint(step, items))
                    .join('')
                }
            </ul>
        </li>
    `
}

const buildStepForPrint = (step:Step, items:DeploymentItem[]) => {
    const stepData = items.find(item => item.stepId == step.id);

    return `
        <li class="pv__step">
            <div class="pv__title-container">
                <svg class="pv__not-done" ${stepData.itemState == 0 && stepData.integrator == undefined ? "" : `style="display:none"`}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M19 13H5v-2h14v2z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
                <svg class="pv__incomplete" ${stepData.itemState == 0 && stepData.integrator != undefined ? "" : `style="display:none"`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                <svg class="pv__complete" ${stepData.itemState == 1 ? "" : `style="display:none"`}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <svg class="pv__not-applicable" ${stepData.itemState == 2 ? "" : `style="display:none"`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
                </svg>
                <span class="pv__step-title">${step.title}</span>
            </div>
            <div class="pv__status-container">
                <div class="pv__step-status">${buildStatus(stepData)}</div>
                ${buildNotesForPrint(stepData)}
            </div>
        </li>
    `
}

const buildNotesForPrint = (stepData: DeploymentItem) => {
    if (stepData.note == undefined || stepData.note == '') {
        return ''
    } else {
        return `
        <div class="pv__step-notes">
            <div>Integrator note:</div> ${stepData.note} 
            <div>${buildNoteStatus(stepData)}</div>
         </div>
        `
    }
}