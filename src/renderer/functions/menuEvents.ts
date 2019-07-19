import $ from 'jquery';
import { renderDeploymentList } from "./deploymentListBuilder";
import { renderCreateDeployment } from "./newDeploymentBuilder";
import { renderMainMenu, renderPrintMenu, renderChecklistMenu } from "./menuBuilder";
import { dbPromise } from '../data/db';
import { Deployment } from '../models/deployment';
import { updateDeployment, getItemsByDeploymentId } from './helpers/dbFunctions';
import { renderChecklist } from './checklistBuilder';
import {ipcRenderer} from 'electron';
import { showModal } from './modalBuilder';
import { renderPrintView } from './printViewBuilder';
import { renderImportDeployment } from './importDeploymentBuilder';


//MAIN MENU EVENTS
export const loadMainMenuEvents = () => {

    $('#menu_deployment-list').click(() => renderDeploymentList()); 
    $('#menu_new-deployment').click(() => renderCreateDeployment()); 
    $('#menu_deployment-import').click(() => renderImportDeployment());
    
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

    //when clicking print to pdf, send a print to pdf command to execute in the main process
    $('#print-pdf').click(() => {
        const title = document.getElementById('pdf-title').innerHTML; 
        ipcRenderer.send('print-to-pdf', title)
    });

    ipcRenderer.on('print-done', () => {
        $('#print-pdf').removeClass('current-menu-item');
    });

    highlightSelectedMenuItems();
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

    //show the edit moadal when clicking the edit details button and pass in the checklist context
    $('#menu-edit').click(async function(){
        await showModal(id, "edit", "checklist");
    });

    $('#menu-export').click(async function(){
        await exportDeploymentData(deployment);
    })

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

const exportDeploymentData = async (deployment:Deployment) => {

    let itemData = await generateItemDataForExport(deployment.id.toString());

    let data = `
        { "deployment":
            {
                "name": ${JSON.stringify(deployment.name)},
                "productTier": ${JSON.stringify(deployment.productTier)},
                "integrator": ${JSON.stringify(deployment.integrator)},
                "currentPhaseId": ${JSON.stringify(deployment.currentPhaseId)},
                "dateCreated": ${JSON.stringify(deployment.dateCreated)},
                "dateModified": ${JSON.stringify(deployment.dateModified)}
            },

        "deploymentItems": [
                ${itemData}
            ]
        }
    `
    ipcRenderer.send('export-data', data, deployment.name);
    ipcRenderer.on('export-done', () => {
        renderChecklistMenu(deployment.id.toString());
    })
    
}

const generateItemDataForExport = (id:string) => {
    
    return dbPromise().then(async db => {
       
        let itemData = '';
        const items = await getItemsByDeploymentId(id, db); 
        
        items.forEach((item, index, array) => {
            itemData += `
                {
                    "stepId": ${JSON.stringify(item.stepId)},
                    "itemState": ${JSON.stringify(item.itemState)},
                    "itegrator": ${JSON.stringify(item.integrator)},
                    "date": ${JSON.stringify(item.date)},
                    "note": ${JSON.stringify(item.note)},
                    "noteDate": ${JSON.stringify(item.noteDate)},
                    "noteIntegrator": ${JSON.stringify(item.noteIntegrator)}
                }${index === (array.length - 1) ? '' : ','}
            `
        })
        return itemData;
    })
}