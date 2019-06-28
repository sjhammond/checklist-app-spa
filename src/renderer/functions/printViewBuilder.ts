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
import { renderPrintMenu } from "./menuBuilder";
import { scrollToTop } from "./helpers/scrollToTop";


export const renderPrintView = (id:string) => {
    let deployment:Deployment;
    let phases:Phase[]; 
    let tasks:Task[];
    let steps:Step[];
    let items:DeploymentItem[]; 
    let mainContent = '';
    
    //render print menu
    renderPrintMenu();

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
        //render html in the app container
        document.getElementById('main-content').innerHTML = mainContent;
    })
}

const buildPrintHeader = (deployment:Deployment) => {
    return `
        <section>
            <div> 
                ${deployment.name}
            </div>
            <div>
                XProtect ${(deployment.productTier < 4) ? ProductTier[deployment.productTier] + "+" : ProductTier[deployment.productTier]}
            </div>
            <div>
                Last modified:<span>${(deployment.dateModified).toLocaleString('default', dateOptions)}</span>
            </div>
            <div>
                Integrator:<span>${deployment.integrator}</span>
            </div>
            <div>
                Printed on: ${new Date().toLocaleString('default', dateOptions)}
            </div>
        </section>
    `
}

const buildPhaseForPrint = (phase:Phase, tasks:Task[], steps:Step[], items:DeploymentItem[]) => {
    const phaseTasks = tasks.filter(task => task.phaseId == phase.id); 

    return `
        <section>
            <div> 
                <h1>${phase.title}</h1>
                <ul>
                    ${phaseTasks
                        .map(task => {return buildTaskForPrint(task, steps, items)})
                        .join('')
                    }
                </ul>
            </div>
        </section>
    `
}

const buildTaskForPrint = (task:Task, steps:Step[], items:DeploymentItem[]) => {
    const taskSteps = steps.filter(step => step.taskId == task.id); 

    return `
        <li>
            <div>
                <h2>${task.title}</h2>
                <ul>
                    ${taskSteps
                        .map(step => buildStepForPrint(step, items))
                        .join('')
                    }
                </ul>
            </div>
        </li>
    `
}

const buildStepForPrint = (step:Step, items:DeploymentItem[]) => {
    const stepData = items.find(item => item.stepId == step.id);

    return `
        <li>
            <h3>${step.title}</h3>
            <div>
                ${buildStatus(stepData)}
            </div>
            <div>
                <span>Notes:</span> ${stepData.note == undefined || stepData.note == '' ? '' : stepData.note} (${buildNoteStatus(stepData)})
            </div>
        </li>
    `
}