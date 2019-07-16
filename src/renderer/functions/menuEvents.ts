import $ from 'jquery';
import { renderDeploymentList } from "./deploymentListBuilder";
import { renderCreateDeployment } from "./newDeploymentBuilder";
import { renderMainMenu } from "./menuBuilder";
import { dbPromise } from '../data/db';
import { Deployment } from '../models/deployment';
import { updateDeployment } from './helpers/dbFunctions';
import { renderChecklist } from './checklistBuilder';
import {ipcRenderer} from 'electron';

export const loadMainMenuEvents = () => {

    $('#menu_deployment-list').click(() => renderDeploymentList()); 
    $('#menu_new-deployment').click(() => renderCreateDeployment()); 
    
    highlightSelectedMenuItems();
}

export const loadPrintMenuEvents = () => {
    
    $('.menu-back-icon').click(() => {
        renderDeploymentList();
        renderMainMenu();
        $('#menu_deployment-list').addClass('current-menu-item'); //select 'load deployment' on the menu 
    });

    $('#print-pdf').click(() => ipcRenderer.send('print-to-pdf'));

    highlightSelectedMenuItems();
}

export const loadChecklistMenuEvents = async (deployment:Deployment) => {

    //select the current phase in the checklist menu
    $('.menu-list').find(`[data-id='${deployment.currentPhaseId}']`).addClass('current-menu-item');

    //upon clicking the back button, load the deployment list and render main mainu
    $('.menu-back-icon').click(() => {
        renderDeploymentList();
        renderMainMenu();
        $('#menu_deployment-list').addClass('current-menu-item'); //select 'load deployment' on the menu 
    });

    //when clicking a phase on the checklist menu, update the deployment's currentPhaseId and re-render the checklist
    $('.menu-item').click(async function() {
        const phaseId = $(this).data('id'); //get the phaseId data from the item you clicked
        const id = deployment.id.toString(); //get id from deployment passed into function 
        deployment = {
            id: deployment.id, 
            dateCreated: deployment.dateCreated,
            dateModified: deployment.dateModified,
            name: deployment.name,
            currentPhaseId: phaseId, //update phaseId
            integrator: deployment.integrator,
            productTier: deployment.productTier
        }
        dbPromise()
            .then(async db => {
                await updateDeployment(deployment, db); 
                await renderChecklist(id); 
            })
    });

    highlightSelectedMenuItems();
}

const highlightSelectedMenuItems = () => {

    //toggle the selected class on menu items
    $('.menu-item').click(function(){
        $(this).siblings('.current-menu-item').removeClass('current-menu-item');
        $(this).addClass('current-menu-item');
    });
}