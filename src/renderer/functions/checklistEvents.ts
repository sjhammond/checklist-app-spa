import $ from 'jquery';
import { IDBPDatabase } from 'idb';
import { MilestoneDB } from '../models/milestone-db';
import { ItemState } from '../models/item-state';
import { buildStatus, buildNoteStatus } from './checklistBuilder';
import { getDeployment, getItemsByDeploymentId, updateDeploymentItem, updateDeploymentModifiedDate } from './helpers/dbFunctions';

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
            note: item.note,
            noteDate: item.noteDate,
            noteIntegrator: item.noteIntegrator
        }

        //put the updated record in the db
        await updateDeploymentItem(data, db);
        await updateDeploymentModifiedDate(deployment, db);

        //update the signature html with data values
        $(`#step${stepId}__status`).html(buildStatus(data));
    });
}

export const addDisableStepEvents = async (deploymentId: string, db: IDBPDatabase<MilestoneDB>) => {
    $('.checklist-item__disable').click(async function () {

        //get stepId from data
        const stepId = $(this).data('stepId');

        //toggle selected class on disable icon
        $(`#step${stepId}__disable`).toggleClass('selected');

        //get the deployment & checklist items associated with the deployment
        const deployment = await getDeployment(deploymentId, db);
        const deploymentItems = await getItemsByDeploymentId(deploymentId, db);

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
            note: item.note,
            noteDate: item.noteDate,
            noteIntegrator: item.noteIntegrator
        }

        //put the updated record in the db and update deployment mod date
        await updateDeploymentItem(data, db);
        await updateDeploymentModifiedDate(deployment, db);

        //update the signature html with data values
        $(`#step${stepId}__status`).html(buildStatus(data));
    });
}


export const addNoteEvents = async (id:string, db: IDBPDatabase<MilestoneDB>) => {

    $('textarea[id$="__note"]').on('input selectionchange propertychange', function (e){
         //get stepId from event target
        const stepId = parseInt(e.target.dataset.stepId); 
        const saveButton = $(`step${stepId}__save-note`);
        saveButton.removeClass('disabled');
    });

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
        if (item.note == undefined || stepNote != item.note){
        
            //define the data to put to the db
            //pass though all the item attributes that are unchanged
            const data = {
                id: item.id,
                deploymentId: item.deploymentId,
                stepId: item.stepId,
                itemState: item.itemState,
                integrator: item.integrator,
                date: item.date,
                note: stepNote, //update
                noteDate: new Date(), //update
                noteIntegrator: deployment.integrator //update
            };

            //put the updated record in the db
            await updateDeploymentItem(data, db);
            await updateDeploymentModifiedDate(deployment, db);

            //update the note status html with data values
            $(`#step${stepId}__note-status`).html(buildNoteStatus(data));

            //add ore remove the hasnote class on the note icon
            const noteIcon = $(`#step${stepId}__checkbox`).parent().find('.checklist-button-container').find('.checklist-note__expand');
            
            if(stepNote == ''){
                noteIcon.removeClass('hasnote');
            } else {
                noteIcon.addClass('hasnote');
            }
        }
    });
}