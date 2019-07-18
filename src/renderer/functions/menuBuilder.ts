import { getAllFromObjectStore, getItemsByDeploymentId, getDeployment } from './helpers/dbFunctions';
import { dbPromise } from '../data/db';
import { Phase } from '../models/phase';
import { DeploymentItem } from '../models/deployment-item';
import { Step } from '../models/step';
import { Task } from '../models/task';
import { ItemState } from '../models/item-state';
import { Deployment } from '../models/deployment';
import { loadMainMenuEvents, loadPrintMenuEvents, loadChecklistMenuEvents } from './menuEvents';

export const renderMainMenu = () => {
    //render the main menu html
    const menu = document.getElementById('menu');
    const topbar = document.getElementById('topbar');

    hideTopbar(topbar);

    menu.innerHTML = `
        <div id="inner-menu">
            <ul class="menu-list" id="main-menu">
                <li class="menu-item" id="menu_new-deployment">New Deployment</li>
                <li class="menu-item" id="menu_deployment-list">Load Deployment</li>
                <li class="menu-item" id="menu_deployment-list">Import Deployment</li>
                <li class="menu-item" id="menu_about">About</li>
            </ul>
        </div> 
    `
    loadMainMenuEvents(); 
}

export const renderPrintMenu = (id:string, context:String) => {

    //get the deployment
    dbPromise()
        .then(async db => {
            const deployment = await getDeployment(id, db);
            const menu = document.getElementById('menu'); 
            const topbar = document.getElementById('topbar');

            topbar.innerHTML = `
                <div id="topbar-content">
                    <svg id="topbar-back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
                    </svg>
                    <span id="pv_topbar-title">${deployment.name} - Print View</span>
                </div>
            `
            showTopbar(topbar); 

            menu.innerHTML = `
                <div id="inner-menu">
                    <ul class="menu-list" id="print-menu">
                        <li class="menu-item" id="print-pdf">Print to PDF</li>
                        <li class="menu-item" id="print-settings">Options</li>
                    </ul>
                </div> 
            `
            loadPrintMenuEvents(deployment.id.toString(), context);
        });
}

export const renderChecklistMenu = (id:string) => {

    let deployment:Deployment; 
    let phases:Phase[];
    let tasks:Task[];
    let steps:Step[];
    let items:DeploymentItem[];

    //get the deployment, phases, tasks, steps, and item data to caclulate progress
    dbPromise()
    .then(async db => {
        deployment = await getDeployment(id, db);
        phases = await getAllFromObjectStore('phases', db);
        tasks = await getAllFromObjectStore('tasks', db);
        steps = await getAllFromObjectStore('steps', db)
        items = await getItemsByDeploymentId(id, db);
    }).then(() => {
        //render the checklist menu html
        const menu = document.getElementById('menu');
        const topbar = document.getElementById('topbar');

        topbar.innerHTML = `
            <div id="topbar-content">
                <svg id="topbar-back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
                </svg>
                <span id="topbar-title">${deployment.name} - Deployment Checklist</span>
                <span id="topbar-integrator">editing as ${deployment.integrator}</span>
            </div>
        `

        showTopbar(topbar); 

        menu.innerHTML = `
            <div id="inner-menu">
                <ul class="menu-list" id="checklist-menu">
                    ${phases
                        .map(phase => {return buildChecklistMenuItem(deployment, phase, tasks, steps, items)})
                        .join('')
                        }
                    <li class="menu-subhead">Actions</li>
                    <li class="menu-item" id="menu-edit">
                        <span>Edit Details</span>
                    </li>
                    <li class="menu-item" id="menu-export">
                        <span>Export Deployment</span>
                    </li>
                    <li class="menu-item" id="menu-print">
                        <span>Print View</span>
                    </li>
                </ul>
            </div> 
        `
        loadChecklistMenuEvents(deployment); 
    });
}

const buildChecklistMenuItem = (deployment:Deployment, phase:Phase, tasks:Task[], steps:Step[], items:DeploymentItem[]) => {
    
    let phaseSteps:Step[] = [];
    let phaseData:DeploymentItem[] = [];

    //filter tasks that pertain to each phase (check product tiers too)
    const phaseTasks = tasks.filter(task => task.phaseId == phase.id && task.productTier <= deployment.productTier);
    
    //filter steps for each task in each phase (check product tiers too)
    phaseTasks.forEach(task => {
        let partialArray = steps.filter(step => step.taskId == task.id && step.productTier <= deployment.productTier);
        phaseSteps = phaseSteps.concat(partialArray); 
    });

    //filter corresponding item data for each step in the phase
    phaseSteps.forEach(step => {
        let partialArray = items.filter(item => item.stepId == step.id);
        phaseData = phaseData.concat(partialArray);
    });

    //create an array of completed items
    let phaseItemsComplete = phaseData.filter(item => item.itemState == ItemState.Complete || item.itemState == ItemState.NotApplicable);

    //compute the percentage of steps completed per phase
    let phaseCompletionPercent = Math.round((phaseItemsComplete.length / phaseData.length) * 100);

    return `
        <li class='menu-item menu-phase' data-id="${phase.id}">
            <span id="menu__phase-${phase.id}-title">${phase.title}</span>
            <span id="menu__phase-${phase.id}-pct"> - ${phaseCompletionPercent}%</span>
        </li>
    `
}

const showTopbar = (topbar:HTMLElement) => {

    topbar.style.height = "32px";
    topbar.style.borderBottom = "1px solid #b0bdc6";

}

const hideTopbar = (topbar:HTMLElement) => {

    topbar.style.height = "0";
    topbar.style.borderBottom = "none";

}