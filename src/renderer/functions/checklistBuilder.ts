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
import { renderMainMenu } from './menuBuilder';

export const renderChecklist = (id:string) => {
    //declare global vars
    let deployment: Deployment;
    let phase: Phase;
    let mainContent = '';
    let dbContext: IDBPDatabase<MilestoneDB>;

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

        //render menu
        renderMainMenu();

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
        $(".checklist-item__disable").load("./svg/disable.svg")
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
        <ul class='checklist-container'>
            ${steps
                .filter(step => step.productTier.valueOf() <= deployment.productTier.valueOf())
                .map(step => { return buildSteps(step, items) })
                .join('')
            }
        </ul>
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
        <li class='checklist-item'>
            <div class='checklist-item-container'>
                <input id='step${step.id}__checkbox' type='checkbox' data-step-id='${step.id}' ${checkboxStatus}/>
                <label for='step${step.id}__checkbox' class='checkbox'></label>
                <div class='checklist-item__title'>${step.title}</div>
                <div class='checklist-button-container'>
                    <button class='checklist-item__expand' aria-label='Toggle Info' title='Show more information'>
                        <span class='line'></span>
                    </button>
                    <button class='checklist-note__expand${item.note == undefined || item.note == '' ? '' : ' hasnote'}' aria-label='Toggle Notes' title='Add note'>
                    </button>
                    <button class='checklist-item__disable' id='step${step.id}__disable' class='disable-step${disableStatus}' title="This step doesn't apply" data-step-id='${step.id}'}>
                    </button>
                </div>
            </div>
            <div class='note-container'>
                <textarea class="note-field" rows="6" cols="1" id='step${step.id}__note' name='step${step.id}__note' data-step-id='${step.id}'>${item.note == undefined || item.note == '' ? '' : item.note}</textarea>
                <div class="note-controls">
                    <span class="status" id='step${step.id}__note-status'>${buildNoteStatus(item)}</span>
                    <button class="save-note-btn disabled" id="step${step.id}__save-note" type="button" data-step-id="${step.id}">Save Note</button>
                </div>
            </div>
            <div class='info-container'>
                <span class="status" id='step${step.id}__status'>${buildStatus(item)}</span>
                <div class='info' include-html='info_content/${step.infoPath}.htm'>
                </div>
            </div>
        </li>
    `
}

//build the step status html
export const buildStatus = (data: DeploymentItem): string => {
    if (data.integrator != undefined) {
        return `Marked
            <em> ${data.itemState != ItemState.NotApplicable ? ItemState[data.itemState] : "Does Not Apply"} </em>
            by <strong>${data.integrator}</strong> on ${data.date.toLocaleString('default', dateOptions)}
        `;
    } else {
        return '';
    }
}

//build the note status html
export const buildNoteStatus = (data: DeploymentItem): string => {
    if (data.noteIntegrator != undefined && data.note != '') {
        return `Written by 
            <strong>${data.noteIntegrator}</strong> 
            on ${data.noteDate != undefined ? data.noteDate.toLocaleString('default', dateOptions) : ''}
        `;
    } else {
        return '';
    }
}