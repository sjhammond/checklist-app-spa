import $ from 'jquery';
import { renderDeploymentList } from './deploymentListBuilder';
import { renderCreateDeployment } from './newDeploymentBuilder';
import { getAllFromObjectStore, getItemsByDeploymentId, getDeployment } from './helpers/dbFunctions';
import { dbPromise } from '../data/db';
import { Phase } from '../models/phase';
import { DeploymentItem } from '../models/deployment-item';
import { Step } from '../models/step';
import { Task } from '../models/task';
import { ItemState } from '../models/item-state';
import { Deployment } from '../models/deployment';

export const renderMainMenu = () => {
    //render the main menu html
    const menu = document.getElementById('menu'); 
    menu.innerHTML = `
        <div id="inner-menu">
            <ul class="menu-list" id="main-menu">
                <li class="menu-item" id="menu_deployment-list">Load Deployment</li>
                <li class="menu-item" id="menu_new-deployment">New Deployment</li>
                <li class="menu-item" id="menu_settings">Settings</li>
                <li class="menu-item" id="menu_about">About</li>
            </ul>
        </div> 
    `
    //attach event listeners
    $('#menu_deployment-list').click(() => renderDeploymentList());
    $('#menu_new-deployment').click(() => renderCreateDeployment());
}

export const renderPrintMenu = () => {
    //render the print view menu html
    const menu = document.getElementById('menu'); 
    menu.innerHTML = `
        <div id="inner-menu">
            <ul class="menu-list" id="print-menu">
                <li class="menu-item" id="menu_deployment-list">Load Deployment</li>
                <li class="menu-item" id="menu_new-deployment">New Deployment</li>
                <li class="menu-item" id="menu_settings">Settings</li>
                <li class="menu-item" id="menu_about">About</li>
            </ul>
        </div> 
    `
    //attach event listeners
    $('#menu_deployment-list').click(() => renderDeploymentList());
    $('#menu_new-deployment').click(() => renderCreateDeployment());
}

export const renderChecklistMenu = (id:string) => {
    let deployment:Deployment; 
    let phases:Phase[];
    let tasks:Task[];
    let steps:Step[];
    let items:DeploymentItem[];

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
                    <li class="menu-item" id="menu_deployment-list">Return to Deployments</li>
                    ${phases
                        .map(phase => {return buildChecklistMenuItem(deployment, phase, tasks, steps, items)})
                        .join('')
                        }
                </ul>
            </div> 
        `
        $('#menu_deployment-list').click(() => {
            renderDeploymentList();
            renderMainMenu();
        });
    });
}

const buildChecklistMenuItem = (deployment:Deployment, phase:Phase, tasks:Task[], steps:Step[], items:DeploymentItem[]) => {
    
    let phaseSteps:Step[] = [];
    let phaseData:DeploymentItem[] = [];

    //get the tasks that pertain to the phase
    const phaseTasks = tasks.filter(task => task.phaseId == phase.id && task.productTier <= deployment.productTier);
    
    //for each task in the phase, add its steps to an array 
    phaseTasks.forEach(task => {
        let partialArray = steps.filter(step => step.taskId == task.id && step.productTier <= deployment.productTier);
        phaseSteps = phaseSteps.concat(partialArray); 
    });

    //for each step in the phase, put its corresponding item data in another array
    phaseSteps.forEach(step => {
        let partialArray = items.filter(item => item.stepId == step.id);
        phaseData = phaseData.concat(partialArray);
    });

    //create a new array of only the completed items
    let phaseItemsComplete = phaseData.filter(item => item.itemState == ItemState.Complete || item.itemState == ItemState.NotApplicable);
    let phaseComplettionPercent = Math.round((phaseItemsComplete.length / phaseData.length) * 100);

    return `
        <li>
            <div>${phase.title}</div>
            <div>${phaseComplettionPercent}%</div>
        </li>
    `
}
