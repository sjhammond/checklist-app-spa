import $ from 'jquery'
import { dbPromise } from '../data/db';
import { renderDeploymentList } from './deploymentListBuilder';
import { Deployment } from '../models/deployment';
import { updateDeployment} from './helpers/dbFunctions';
import { renderMainMenu, renderChecklistMenu } from './menuBuilder';
import { renderChecklist } from './checklistBuilder';


//DELETE MODAL EVENTS 

export const addDeleteModalEvents = (id: string) => {

    const modal = document.getElementById("modal");

    //click delete to delete deployment 
    $('#modal__delete').click(async () => {
        await deleteDeployment(id);
        modal.style.display = 'none';
    })

    //close delete modal on cancel
    $('#modal__cancel-delete, #modal-close').click(() => modal.style.display = 'none');
}

//EDIT MODAL EVENTS 

export const addEditModalEvents = (deployment:Deployment, context:string) => {
    
    const modal = document.getElementById("modal");
    const name = document.getElementById('edit__deployment-name') as HTMLInputElement;
    const product = document.getElementById('edit__product') as HTMLSelectElement;
    const integrator = document.getElementById('edit__integrator') as HTMLInputElement
    
    //prevent form refresh
    $('form').submit(e => e.preventDefault());

    //enable save button on field keyup or change
    $('#edit__deployment-name,#edit__integrator').keyup(() => $('#modal__save-edit').removeAttr('disabled'));
    $('#edit__product').change(() => $('#modal__save-edit').removeAttr('disabled')); 

    //update deployment info on save
    $('#modal__save-edit').click(() => {

        const data = {
                id: deployment.id,
                name: name.value, //update
                productTier: parseInt(product.value), //update
                integrator: integrator.value, //update
                currentPhaseId: deployment.currentPhaseId,
                dateCreated: deployment.dateCreated,
                dateModified: deployment.dateModified,
                headerImage: deployment.headerImage,
                printSignoff: deployment.printSignoff   
        }

        if(name.checkValidity() && integrator.checkValidity()){
            dbPromise().then(async db => {
                await updateDeployment(data, db);
                switch(context) {
                    case "deploymentList": 
                        renderMainMenu();
                        renderDeploymentList();
                        modal.style.display = 'none';
                        break;
                    case "checklist":
                        renderChecklistMenu(deployment.id.toString());
                        renderChecklist(deployment.id.toString());
                        modal.style.display = 'none';
                } 
            })
        }
    })
    
    //close edit modal on cancel
    $('#modal__cancel-edit, #modal-close').click(e => {
        e.preventDefault();
        modal.style.display = 'none';
        if(context == "checklist"){
            renderChecklistMenu(deployment.id.toString());
        }
    })

}

//PRINT MODAL EVENTS

export const addPrintOptionsModalEvents = async (id:string) => {

    const modal = document.getElementById("modal");
    const fileInput = document.getElementById("image-upload") as HTMLInputElement; 

    $('#image-upload').bind('change', async () => {
        const file = fileInput.files[0];
        const fr = new FileReader();
        fr.onload = previewImageData; 
        fr.readAsBinaryString(file); 
        
        async function previewImageData() {
            const imgData = fr.result as string;
            const imgPreview = document.getElementById('header-image-preview') as HTMLImageElement;
            imgPreview.src = `data:${file.type};base64,${btoa(imgData)}`; 
        }
    })
    
    //prevent form refresh on submit
    $('form').submit(e => e.preventDefault());

    //close edit modal on cancel
    $('#modal__cancel-edit, #modal-close').click(e => {
        e.preventDefault();
        modal.style.display = 'none';
        $('#print-settings').removeClass('current-menu-item');
    })
}


const deleteDeployment = (id: string) => {
    let deploymentId = parseInt(id);

    //delete the deployment from deployments db store
    dbPromise()
        .then(async db => {

            await db
                .transaction('deployments', 'readwrite')
                .objectStore('deployments')
                .delete(deploymentId);

            //get the items associated with the deployment
            const items = await db
                .transaction('deployment-items', 'readwrite')
                .objectStore('deployment-items')
                .index('deploymentId')
                .getAllKeys(deploymentId);

            //delete each item for the deployment from deployment-items db store
            for (const item of items) {
                await db
                    .transaction('deployment-items', 'readwrite')
                    .objectStore('deployment-items')
                    .delete(item);
            }
        })

    //remove the element from the table
    const el = document.getElementById('deployment' + id.toString());
    el.remove();

    //check if there are no more delpoyments - if there aren't display the 'no deployments' message
    const deploymentListLength = document.getElementsByClassName('deployment');
    if (deploymentListLength.length === 0) {
        renderDeploymentList();
    }
}