import $ from 'jquery';
import { IDBPDatabase } from 'idb';
import { MilestoneDB } from '../models/milestone-db';
import { ItemState } from '../models/item-state';
import { buildStatus, buildNoteStatus } from './checklistBuilder';
import { getDeployment, getItemsByDeploymentId, updateDeploymentItem, updateDeploymentModifiedDate, getAllFromObjectStore } from './helpers/dbFunctions';
import { Step } from '../models/step';
import { DeploymentItem } from '../models/deployment-item';

export const addCompleteStepEvents = async (id:string, db: IDBPDatabase<MilestoneDB>) => {
    $('input[id$="__checkbox"]').click(async function (e) {
        
        //get event targets
        const stepId = parseInt(e.target.dataset.stepId); 
        const checked = e.originalEvent.srcElement['checked'];
        
        //get the deployment
        const deployment = await getDeployment(id, db);

        //get the checklist items associated with the deployment
        const deploymentItems = await getItemsByDeploymentId(id, db); 
        
        //retrieve the one deployment item associated with this step
        const item = deploymentItems.find(i => i.stepId == stepId)

        //declare status variable to check
        let checkboxStatus: ItemState; 

        //if status is checked, set to complete, otherwise set to incomplete
        if (checked){
            checkboxStatus = ItemState.Complete;
        } else {
            checkboxStatus = ItemState.Incomplete;
        }

        //define the data to put to the db
        //pass though all the item attributes that are unchanged
        //just change the date, integrator, and status
        const data = {
            id: item.id,
            deploymentId: item.deploymentId,
            stepId: item.stepId,
            itemState: checkboxStatus,
            integrator: deployment.integrator,
            date: new Date(),
            note: item.note == null ? null : encodeURIComponent(item.note),
            noteDate: item.noteDate,
            noteIntegrator: item.noteIntegrator
        }

        //put the updated record in the db
        await updateDeploymentItem(data, db);
        await updateDeploymentModifiedDate(deployment, db);

        //update the signature html with data values
        $(`#step${stepId}__status`).html(buildStatus(data));

        updateChecklistMenuPercentage(id, db); 
    });
}

export const addDisableStepEvents = async (id: string, db: IDBPDatabase<MilestoneDB>) => {
    $('.checklist-item__disable').click(async function () {

        //get stepId from data
        const stepId = $(this).data('stepId');

        //toggle selected class on disable icon
        $(`#step${stepId}__disable`).toggleClass('selected');

        //get the deployment & checklist items associated with the deployment
        const deployment = await getDeployment(id, db);
        const deploymentItems = await getItemsByDeploymentId(id, db);

        //retrieve the deployment item associated with this step
        const item = deploymentItems.find(i => i.stepId == stepId)

        //get the corresponding checkbox and item status
        const checkbox = $(`#step${stepId}__checkbox`)
        let stepStatus: ItemState;

        if ($(this).hasClass('selected')) {
            //set item status to 'does not apply'
            stepStatus = ItemState.NotApplicable;
            //clear and disable the step checkbox
            checkbox.prop('checked', false);
            checkbox.prop('disabled', true);
        } else {
            //revert to incomplete and enable checkbox
            stepStatus = ItemState.Incomplete;
            checkbox.prop('disabled', false);
        }

        //define the data to put to the db
        //pass though all the item attributes that are unchanged
        const data = {
            id: item.id,
            deploymentId: item.deploymentId,
            stepId: item.stepId,
            itemState: stepStatus, //update
            integrator: deployment.integrator, //update
            date: new Date(), //update
            note: item.note == null ? null : encodeURIComponent(item.note),
            noteDate: item.noteDate,
            noteIntegrator: item.noteIntegrator
        }

        //put the updated record in the db and update deployment mod date
        await updateDeploymentItem(data, db);
        await updateDeploymentModifiedDate(deployment, db);

        //update the signature html with data values
        $(`#step${stepId}__status`).html(buildStatus(data));

        updateChecklistMenuPercentage(id, db); 
    });
}


export const addNoteEvents = async (id:string, db: IDBPDatabase<MilestoneDB>) => {

    //declare save button for global scope use
    let saveButton:JQuery<HTMLElement>;

    //when the note field changes 
    $('textarea[id$="__note"]').keyup(function (e){
        //get stepId from event target
        const stepId = parseInt(e.target.dataset.stepId);
        //use stepId to get the proper save button
        saveButton = $(`#step${stepId}__save-note`);
        //enable the save button
        saveButton.removeAttr('disabled');
    });

    $('.close-note-btn').click(function(){
        $(this).parent().parent().parent().find('.note-container').slideToggle('fast');
        $(this).parent().parent().parent().find('.svg-note-icon').toggleClass('active');
    })

    $('button[id$="__save-note"]').click(async function (e) {
        
        //get stepId from event target
        const stepId = parseInt(e.target.dataset.stepId); 
        
        //get the deployment the event is associated with
        const deployment = await getDeployment(id, db);

        //get the checklist items associated with the deployment
        const deploymentItems = await getItemsByDeploymentId(id, db);
        
        //retreive the specific deployment item
        const item = deploymentItems.find(i => i.stepId == stepId);

        //get the note from the form field
        const noteInput= <HTMLInputElement>document.getElementById(`step${stepId}__note`);
        const stepNote = noteInput.value; 

        //if the note is different, save the updated note
        if (stepNote != item.note){
        
            //define the data to put to the db
            //pass though all the item attributes that are unchanged
            const data = {
                id: item.id,
                deploymentId: item.deploymentId,
                stepId: item.stepId,
                itemState: item.itemState,
                integrator: item.integrator,
                date: item.date,
                note: stepNote == null || stepNote == '' ? null : encodeURIComponent(stepNote), //update
                noteDate: new Date(), //update
                noteIntegrator: deployment.integrator //update
            };

            //put the updated record in the db
            await updateDeploymentItem(data, db);
            await updateDeploymentModifiedDate(deployment, db);

            //update the note status html with data values
            $(`#step${stepId}__note-status`).html(buildNoteStatus(data));

            //add or remove the hasnote class on the note icon
            const noteIcon = $(`#step${stepId}__checkbox`).parent().find('.checklist-button-container').find('.checklist-note__expand');
            
            if(stepNote == ''){
                noteIcon.removeClass('hasnote');
            } else {
                noteIcon.addClass('hasnote');
            }
        }

        //disable the save button when done
        saveButton.attr('disabled', 'disabled');
    });
}

const updateChecklistMenuPercentage = async (id:string, db:IDBPDatabase<MilestoneDB>) => {
    const deployment = await getDeployment(id, db);
    const currentPhase = deployment.currentPhaseId;
    const tasks = await getAllFromObjectStore('tasks', db);
    const steps = await getAllFromObjectStore('steps', db);
    const items = await getItemsByDeploymentId(id, db);
    const phaseTasks = tasks.filter(task => task.phaseId == currentPhase && task.productTier <= deployment.productTier);
    
    let phaseSteps:Step[] = [];
    let phaseData:DeploymentItem[] = [];
    
    //filter the steps for task in the phase (also filtered by product)
    phaseTasks.forEach(task => {
        let partialArray = steps.filter(step => step.taskId == task.id && step.productTier <= deployment.productTier);
        phaseSteps = phaseSteps.concat(partialArray); 
    });

    //filter the corresponding item data for each step in the phase
    phaseSteps.forEach(step => {
        let partialArray = items.filter(item => item.stepId == step.id);
        phaseData = phaseData.concat(partialArray);
    });

    //create a separate array of completed items
    let phaseItemsComplete = phaseData.filter(item => item.itemState == ItemState.Complete || item.itemState == ItemState.NotApplicable);

    //compute the percentage of steps completed per phase
    let phaseCompletionPercent = Math.round((phaseItemsComplete.length / phaseData.length) * 100);

    //update the percentage displayed for the phase
    document.getElementById(`menu__phase-${currentPhase}-pct`).innerHTML = `${phaseCompletionPercent}%`
}

export const progressBarEvents = () => {
    //get all the task progress bars
    const progressBars = Array.from(document.querySelectorAll('.checklist__percentage-border'));

    //for each bar
    progressBars.forEach(bar => {
        //get the tasklist it realtes to
        const taskList = bar.parentNode;
        //update the progress bar
        updateTaskProgress(taskList); 
    })

    //when a checkbox status changes
	$('input[type="checkbox"]').change(function(){
        //get the tasklist it realtes to
        const taskList = this.parentNode.parentNode.parentNode.parentNode;
        //update the progress bar
        updateTaskProgress(taskList);
    })

    //when you disable a step
    $('.checklist-item__disable').click(function(){
        //get the task list it realtes to
        const taskList = this.parentNode.parentNode.parentNode.parentNode.parentNode;
        //update the progress bar
        updateTaskProgress(taskList);
    })
}

const updateTaskProgress = (taskList:Node & ParentNode) => {
    //take the sum of completed and disabled steps and divide it by the total number of steps in the task list
    const pct = (taskList.querySelectorAll('input:checked').length + taskList.querySelectorAll('.checklist-item__disable.selected').length) / taskList.querySelectorAll(".checklist-item").length;
    
    //get the progress bar and cast it as an HTMLElement to manipulate its style
    const progressBar = taskList.querySelector('.checklist__percentage-border') as HTMLElement; 

    //update the progress bar to reflect the percentage (cap it at 100%)
    if (pct <= 1){
        progressBar.style.transform = `scaleX(${pct})`;
    }
    
    if (pct >= 1){
        progressBar.style.background = `#0099da`
    }
}

