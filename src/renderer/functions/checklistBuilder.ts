import $ from 'jquery';
import { Task } from "../models/task";
import { Step } from "../models/step";
import { DeploymentItem } from "../models/deployment-item";
import { ItemState } from "../models/item-state";
import { dateOptions } from "./helpers/dateOptions";
import { Deployment } from "../models/deployment";
import { Phase } from "../models/phase";
import { IDBPDatabase } from "idb";
import { MilestoneDB } from "../models/milestone-db";
import { dbPromise } from "../data/db";
import { getDeployment, getItemsByDeploymentId } from "./helpers/dbFunctions";
import { addCompleteStepEvents, addDisableStepEvents, addNoteEvents } from "./checklistEvents";
import { includeHTML } from "./helpers/includeHtml";
import { toggleInfo } from "./helpers/toggleInfo";
import { transformLinks } from "./helpers/transformLinks";
import { renderChecklistMenu } from './menuBuilder';

export const renderChecklist = () => {
    //declare global vars
    let deployment: Deployment;
    let phase: Phase;
    let mainContent = '';
    let dbContext: IDBPDatabase<MilestoneDB>;

    //get the deployment id from the URL querystring
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    dbPromise().then(async db => {
        dbContext = db;

        //get the current deployment
        deployment = await getDeployment(id, db);

        //get the current phase for this deployment
        phase = await db
            .transaction('phases', 'readonly')
            .objectStore('phases')
            .get(deployment.currentPhaseId);

        //get all the tasks for this phase
        const tasks = await db
            .transaction('tasks', 'readonly')
            .objectStore('tasks')
            .index('phaseId')
            .getAll(phase.id);

        //get the deployment items for this deployment
        const items = await getItemsByDeploymentId(id, db);

        //for each task
        for (const task of tasks
            //filter out what isn't relevant for this product
            .filter(task => task.productTier.valueOf() <= deployment.productTier.valueOf())) {
            //build the task list
            mainContent += buildTasks(deployment, task,
                //get all the steps related to this task 
                await db
                    .transaction('steps', 'readonly')
                    .objectStore('steps')
                    .index('taskId')
                    .getAll(task.id),
                items);
        }

        //return the built list
        return mainContent;

    }).then(mainContent => {
        //display phase title and list
        document.getElementById('main-content').innerHTML = mainContent;

    }).then(() => {

        renderChecklistMenu();

        //load event listeners
        addCompleteStepEvents(id, dbContext);
        addDisableStepEvents(id, dbContext);
        addNoteEvents(id, dbContext);

        //load helper functions
        includeHTML();
        toggleInfo();
        transformLinks();

        //load icons
        $(".checklist-note__expand").load("./svg/note.svg")
        $("#back_icon").load("./svg/backarrow.svg");
        $("#save_icon").load("./svg/save.svg");
        $("#my-deployments_icon").load("./svg/mydeployments.svg");
        $("#add-new_icon").load("./svg/new.svg");
        $("#settings_icon").load("./svg/settings.svg");
        $(".disable-step").load("./svg/disable.svg");

    });
}

//generates the task-level html for each task in the deployment phase
const buildTasks = (deployment: Deployment, task: Task, steps: Step[], items: DeploymentItem[]): string => {
    return `
      <section class='checklist'>
          <h2 class='checklist__title'>${task.title}</h2>
          <span class='checklist__title-border'></span><span class='checklist__percentage-border'></span>
          ${steps
            .filter(step => step.productTier.valueOf() <= deployment.productTier.valueOf())
            .map(step => { return buildSteps(step, items) })
            .join('')
        }
      </section>
    `
}

//generates the step-level html for each task in the deployment phase
const buildSteps = (step: Step, items: DeploymentItem[]): string => {

    //find the item that matches the step
    const item = items.find(item => item.stepId == step.id);

    //toggle checkbox status
    let checkboxStatus: string;
    if (item.itemState === ItemState.Complete) {
        checkboxStatus = 'checked'
    } else if (item.itemState === ItemState.NotApplicable) {
        checkboxStatus = 'disabled'
    } else {
        checkboxStatus = ''
    }

    //toggle disabled status
    let disableStatus: string;
    if (item.itemState === ItemState.NotApplicable) {
        disableStatus = ' selected'
    } else {
        disableStatus = ''
    }

    //build the step using both step and item data in the db
    return `
        <ul class='checklist-container'>
            <li class='checklist-item'>
                <input id='step${step.id}__checkbox' type='checkbox' data-step-id='${step.id}' ${checkboxStatus}/>
                <label for='step${step.id}__checkbox' class='checkbox'></label>
                <span class='checklist-item__title'>${step.title}</span>
                <button class='checklist-item__expand' aria-label='Toggle Info' title='Show more information'>
                    <span class='line'></span>
                </button>
                <button class='checklist-note__expand' aria-label='Toggle Notes' title='Add note'>
                </button>
                <button id='step${step.id}__disable' class='disable-step${disableStatus}' title="This step doesn't apply" data-step-id='${step.id}'}>
                </button>
                <div class='info-container'>
                    <span id='step${step.id}__status'>${buildStatus(item)}</span>
                    <div class='info' include-html='../renderer/info_content/${step.infoPath}.html'></div>
                    <!--info content-->
                </div>
                <!--info container-->
                <div class='note-container'>
                    <span id='step${step.id}__note-status'>${buildNoteStatus(item)}</span>
                    <input type='text' id='step${step.id}__note' name='step${step.id}__note' value='${item.note == undefined || item.note == '' ? '' : item.note}'/>
                    <button id="step${step.id}__save-note" type="button" data-step-id="${step.id}">Save</button>
                </div>
                <!--note container-->
            </li>
        </ul>
    `
}

//build the step status html
export const buildStatus = (data: DeploymentItem): string => {
    if (data.integrator != undefined) {
        return `Marked
            <strong> ${data.itemState != ItemState.NotApplicable ? ItemState[data.itemState] : "Does Not Apply"} </strong>
            by ${data.integrator} on ${data.date.toLocaleString('default', dateOptions)}
        `;
    } else {
        return '';
    }
}

//build the note status html
export const buildNoteStatus = (data: DeploymentItem): string => {
    if (data.noteIntegrator != undefined && data.note != '') {
        return `Written by 
            ${data.noteIntegrator} 
            on ${data.noteDate != undefined ? data.noteDate.toLocaleString('default', dateOptions) : ''}
        `;
    } else {
        return '';
    }
}