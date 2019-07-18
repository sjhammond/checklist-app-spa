import $ from 'jquery';
import { renderDeploymentList } from "./deploymentListBuilder";
import { renderCreateDeployment } from "./newDeploymentBuilder";
import { renderMainMenu, renderPrintMenu, renderChecklistMenu } from "./menuBuilder";
import { dbPromise } from '../data/db';
import { Deployment } from '../models/deployment';
import { updateDeployment } from './helpers/dbFunctions';
import { renderChecklist } from './checklistBuilder';
import {ipcRenderer} from 'electron';
import { showModal } from './modalBuilder';
import { renderPrintView } from './printViewBuilder';


//MAIN MENU EVENTS
export const loadMainMenuEvents = () => {

    $('#menu_deployment-list').click(() => renderDeploymentList()); 
    $('#menu_new-deployment').click(() => renderCreateDeployment()); 
    
    highlightSelectedMenuItems();
}


//PRINT MENU EVENTS
export const loadPrintMenuEvents = (id:string, context:String) => {
    
    //make sure the back button takes you back to the correct previous screen
    switch (context) {
        case 'deploymentList':
                $('#topbar-back-icon').click(() => {
                    renderDeploymentList();
                    renderMainMenu();
                    $('#menu_deployment-list').addClass('current-menu-item');
                });
        break;

        case 'checklist':
                $('#topbar-back-icon').click(() => {
                    renderChecklist(id);
                    renderChecklistMenu(id);
                    $('#menu_deployment-list').addClass('current-menu-item');
                });
    }

    $('#print-pdf').click(() => ipcRenderer.send('print-to-pdf'));

}

//CHECKLIST MENU EVENTS
export const loadChecklistMenuEvents = async (deployment:Deployment) => {
    
    //get id from deployment passed into function 
    const id = deployment.id.toString(); 

    //select the current phase in the checklist menu
    $('.menu-list').find(`[data-id='${deployment.currentPhaseId}']`).addClass('current-menu-item');

    //upon clicking the back button, load the deployment list and render main mainu
    $('#topbar-back-icon').click(() => {
        renderDeploymentList();
        renderMainMenu();
        $('#menu_deployment-list').addClass('current-menu-item'); //select 'load deployment' on the menu 
    });

    //when clicking a phase on the checklist menu, update the deployment's currentPhaseId and re-render the checklist
    $('.menu-phase').click(async function() {
        const phaseId = $(this).data('id'); //get the phaseId data from the item you clicked
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

    $('#menu-edit').click(async function(){
        await showModal(id, "edit", "checklist");
    });

    $('#menu-print').click(async function() {
        await renderPrintView(id); 
        await renderPrintMenu(id, "checklist"); 
    })

    highlightSelectedMenuItems();
}

const highlightSelectedMenuItems = () => {

    //toggle the selected class on menu items
    $('.menu-item').click(function(){
        $(this).siblings('.current-menu-item').removeClass('current-menu-item');
        $(this).addClass('current-menu-item');
    });
}