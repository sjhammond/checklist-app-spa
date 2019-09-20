import $ from 'jquery'
import { dbPromise } from '../data/db';
import { renderDeploymentList } from './deploymentListBuilder';
import { Deployment } from '../models/deployment';
import { updateDeployment, getDeployment} from './helpers/dbFunctions';
import { renderMainMenu, renderChecklistMenu } from './menuBuilder';
import { renderChecklist } from './checklistBuilder';
import { renderPrintView } from './printViewBuilder';
import { createStaticPath } from './helpers/createStaticPath';

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
                dateModified: new Date(), //update
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
    const imgPreview = document.getElementById('header-image-preview') as HTMLImageElement;

    const defaultImagePath = createStaticPath('./images/logo.png');

    let imgData:string;

    //prevent form refresh on submit
    $('form').submit(e => e.preventDefault());

    //on image selection, read the uplaoded file and replace the preview area with the uploaded image 
    $('#image-upload').bind('change', async () => {

        const file = fileInput.files[0];
        const fr = new FileReader();
        fr.onload = await previewImageData; 
        fr.readAsBinaryString(file); 
        
        async function previewImageData() {
            //convert the image file binary string to base64 (btoa)
            imgData = `data:${file.type};base64,${await btoa(fr.result as string)}`

            //set the image element's src path to the file type and include the encoded data
            imgPreview.src = imgData; 
        }
    })

    //enable saving when the signoff checkbox is ticked/cleared 
    $('#signoff-checkbox').change(() => $('.modal-save').removeAttr('disabled'))

    new MutationObserver(() => {
        $('.modal-save').removeAttr('disabled')
    }).observe(imgPreview,{attributes:true,attributeFilter:['src']})

    //on image reset, set preview to default and set imgData to null
    $('#reset-image').click(() => {
        if(imgPreview.src != defaultImagePath){
            imgData = null;
            imgPreview.src = defaultImagePath;
        }
    });

    //close edit modal on cancel
    $('#modal__cancel-options, #modal-close').click(e => {
        e.preventDefault();
        modal.style.display = 'none';
        $('#print-settings').removeClass('current-menu-item');
    });

    //save data to db
    $('#modal__save-options').click(() => {

        //get the signoff checkbox
        const signoffBox = document.getElementById('signoff-checkbox') as HTMLInputElement;
        let signoffVal:boolean;

        //set the printsignoff boolean value based on the checkbox status
        if(signoffBox.checked){
            signoffVal = true;
        } else {
            signoffVal = false; 
        }

        //upadate the deployment data
        dbPromise().then(async db => {
            const deployment = await getDeployment(id, db);

            const data:Deployment = {
                id: deployment.id,
                name: deployment.name,
                productTier: deployment.productTier,
                integrator: deployment.integrator,
                currentPhaseId: deployment.currentPhaseId,
                dateCreated: deployment.dateCreated,
                dateModified: new Date(), //update
                headerImage: (imgPreview.src == defaultImagePath ? null : imgPreview.src), //update
                printSignoff: signoffVal //update
            }

            await updateDeployment(data, db);
            modal.style.display = "none"; 
            renderPrintView(id); 
        })
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