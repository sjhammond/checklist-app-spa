import { Task } from "../models/task";
import { Step } from "../models/step";
import { DeploymentItem } from "../models/deployment-item";
import { ItemState } from "../models/item-state";
import { dateOptions } from "./helpers/dateOptions";
import { Deployment } from "../models/deployment";
import { IDBPDatabase } from "idb";
import { MilestoneDB } from "../models/milestone-db";
import { dbPromise } from "../data/db";
import { getDeployment, getItemsByDeploymentId } from "./helpers/dbFunctions";
import { addCompleteStepEvents, addDisableStepEvents, addNoteEvents, progressBarEvents } from "./checklistEvents";
import { includeHTML } from "./helpers/includeHtml";
import { toggleInfo } from "./helpers/toggleInfo";
import { transformLinks } from "./helpers/transformLinks";
import { loadInfoContent } from "./helpers/loadInfoContent";
import { scrollToTop } from "./helpers/scrollToTop";

export const renderChecklist = (id:string) => {
    //declare global vars
    let deployment: Deployment;
    let mainContent = '';
    let dbContext: IDBPDatabase<MilestoneDB>;

    //reset scroll postiion of main-content component
    scrollToTop(); 

    dbPromise().then(async db => {
        dbContext = db;
        //get the current deployment
        deployment = await getDeployment(id, db);

        //get the current phase for this deployment
        const phase = await db
            .transaction('phases', 'readonly')
            .objectStore('phases')
            .get(deployment.currentPhaseId);

        //get only the tasks for this phase for building the checklist
        let tasksForBuilding = await db
            .transaction('tasks', 'readonly')
            .objectStore('tasks')
            .index('phaseId')
            .getAll(phase.id);

        //get ALL the tasks for setting the checklist counter
        let tasksForNumbering = await db
            .transaction('tasks', 'readonly')
            .objectStore('tasks')
            .index('phaseId')
            .getAll();

        //filter all the tasks that apply to the product
        tasksForBuilding = tasksForBuilding.filter(task => task.productTier.valueOf() <= deployment.productTier.valueOf());
        tasksForNumbering = tasksForNumbering.filter(task => task.productTier.valueOf() <= deployment.productTier.valueOf());

        //set task number equal to the number of tasks in previous phases
        tasksForNumbering = tasksForNumbering.filter(task => task.phaseId < deployment.currentPhaseId)
        const taskCount = tasksForNumbering.length.toString(); 
        document.getElementById('main-content').style.setProperty("--taskNumber", taskCount);

        //get the deployment items for this deployment
        const items = await getItemsByDeploymentId(id, db);

        //for each task in phaseTasks
        for (const task of tasksForBuilding) {
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
        //load event listeners
        addCompleteStepEvents(id, dbContext);
        addDisableStepEvents(id, dbContext);
        addNoteEvents(id, dbContext);
        progressBarEvents();

        //load helper functions
        includeHTML();
        toggleInfo();
        transformLinks();
    });
}

//generates the task-level html for each task in the deployment phase
const buildTasks = (deployment: Deployment, task: Task, steps: Step[], items: DeploymentItem[]): string => {
    return `
      <section class='checklist'>
        <h2 class='checklist__title'>${task.title}</h2>
        <span class='checklist__title-border'></span><span class='checklist__percentage-border' data-task-id="${task.id}"></span>
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
                        <svg class="svg-note-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM17 11h-4v4h-2v-4H7V9h4V5h2v4h4v2z"/>
                        </svg>
                    </button>
                    <button class='checklist-item__disable${item.itemState != 2 ? '' : ' selected'}' id='step${step.id}__disable' class='disable-step${disableStatus}' title="This step doesn't apply" data-step-id='${step.id}'}>
                        <svg class="disable-step__icon" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1568 1021q0-161-87-295l-754 753q137 89 297 89 111 0 211.5-43.5t173.5-116.5 116-174.5 43-212.5zm-999 299l755-754q-135-91-300-91-148 0-273 73t-198 199-73 274q0 162 89 299zm1223-299q0 157-61 300t-163.5 246-245 164-298.5 61-298.5-61-245-164-163.5-246-61-300 61-299.5 163.5-245.5 245-164 298.5-61 298.5 61 245 164 163.5 245.5 61 299.5z"/>
                        </svg>  
                    </button>
                </div>
            </div>
            <div class='note-container'>
                <textarea class="note-field" rows="6" cols="1" id='step${step.id}__note' name='step${step.id}__note' data-step-id='${step.id}'>${item.note == undefined || item.note == '' ? '' : item.note}</textarea>
                <div class="note-controls">
                    <span class="status" id='step${step.id}__note-status'>${buildNoteStatus(item)}</span>
                    <button class="save-note-btn" id="step${step.id}__save-note" type="button" data-step-id="${step.id}" disabled>Save Note</button>
                </div>
            </div>
            <div class='info-container'>
                <span class="status" id='step${step.id}__status'>${buildStatus(item)}</span>
                <div class='info' include-html='${loadInfoContent(step.infoPath)}'></div>
            </div>
        </li>
    `
}

//build the step status html
export const buildStatus = (data: DeploymentItem): string => {
    if (data.integrator != undefined) {
        return `<b>${data.itemState != ItemState.NotApplicable ? ItemState[data.itemState] : "Does Not Apply"}</b> &#183; ${data.integrator} &#183; ${data.date.toLocaleString('default', dateOptions)}
        `;
    } else {
        return `<em>This step has not been completed.</em>`;
    }
}

//build the note status html
export const buildNoteStatus = (data: DeploymentItem): string => {
    if (data.noteIntegrator != undefined && data.note != '') {
        return `${data.noteIntegrator} - ${data.noteDate != undefined ? data.noteDate.toLocaleString('default', dateOptions) : ''}
        `;
    } else {
        return ``;
    }
}