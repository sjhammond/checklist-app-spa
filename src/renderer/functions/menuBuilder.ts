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
    menu.innerHTML = `
        <div id="inner-menu">
            <ul class="menu-list" id="main-menu">
                <li class="menu-item" id="menu_deployment-list">Load Deployment</li>
                <li class="menu-item" id="menu_new-deployment">New Deployment</li>
                <li class="menu-item" id="menu_about">About</li>
            </ul>
        </div> 
    `
    loadMainMenuEvents(); 
}

export const renderPrintMenu = (deployment:Deployment) => {
    //render the print view menu html
    const menu = document.getElementById('menu'); 
    menu.innerHTML = `
            <div id="inner-menu">
                <ul class="menu-list" id="print-menu">
                    <li id="menu-title">
                    <svg class="menu-back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/></svg>
                        <span>${deployment.name}</span> 
                    </li>
                    <li class="menu-item" id="print-pdf">Print to PDF</li>
                </ul>
            </div> 
        `
    loadPrintMenuEvents(); 
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
        menu.innerHTML = `
            <div id="inner-menu">
                <ul class="menu-list" id="checklist-menu">
                    <li id="menu-title">
                        <svg class="menu-back-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175">
                            <path d="M145.188 238.575l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1l-215.4-215.5z"/>
                        </svg>
                        <span>${deployment.name}</span> 
                    </li>
                    ${phases
                        .map(phase => {return buildChecklistMenuItem(deployment, phase, tasks, steps, items)})
                        .join('')
                        }
                    <li class="menu-item">
                        <span id="menu__edit">Edit Deployment</span>
                    </li>
                    <li class="menu-item">
                        <span id="menu__print">Print</span>
                    </li>
                    <li class="menu-item">
                        <span id="menu__export">Export</span>
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
        <li class='menu-item' data-id="${phase.id}">
            <span id="menu__phase-${phase.id}-title">${phase.title}</span>
            <span id="menu__phase-${phase.id}-pct">${phaseCompletionPercent}%</span>
        </li>
    `
}

