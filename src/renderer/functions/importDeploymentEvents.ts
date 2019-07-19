import $ from 'jquery';
import { dbPromise } from '../data/db';
import { Deployment } from '../models/deployment';
import { DeploymentImport } from '../models/deployment-import';
import { DeploymentItem } from '../models/deployment-item';

export const addImportDeploymentEvents = () => {

    //prevent default form submission (but keep form validation)
    $('form').submit(e => e.preventDefault());

    //on file select, show filename in the custom field and enable the import button
    $('#select-file').bind('change', function(){ 
        const fileInput = document.getElementById("select-file") as HTMLInputElement;
        const fileName = fileInput.files[0].name; 
        if(fileInput.files.length > 0){
            $('#file-name').html(fileName);
            $('#importDeploymentBtn').removeAttr('disabled');
            document.getElementById('status-text').innerHTML = "";
        }
    });

    //on import, read file and add to db
    $('#importDeploymentBtn').on('click', async function(){
        const fileInput = document.getElementById("select-file") as HTMLInputElement;
        const importFile = fileInput.files[0]; 
        const fr = new FileReader();
        fr.onload = importDeploymentData; 
        fr.readAsText(importFile); 

        async function importDeploymentData() {
            const data:DeploymentImport = JSON.parse(fr.result as string);
            await importDeployment(data);
        }
    });
}

const importDeployment = (data:DeploymentImport) => {

    let id: number;

    const deployment: Deployment = {
        dateCreated: new Date(data.deployment.dateCreated),
        dateModified: new Date(data.deployment.dateModified),
        name: data.deployment.name,
        currentPhaseId: data.deployment.currentPhaseId,
        integrator: data.deployment.integrator,
        productTier: data.deployment.productTier
    };

    //open the indexedDB
    dbPromise().then(async db => {

        //add the deployment
        await db
            .transaction('deployments', 'readwrite')
            .objectStore('deployments')
            .add(deployment);

        //retrieve the latest deployment id using back-stepping cursor
        const deploymentCursor = await db
            .transaction('deployments', 'readonly')
            .objectStore('deployments')
            .openCursor(undefined, "prev");
        deploymentCursor.continue();

        id = deploymentCursor.value.id;

        for (var item of data.deploymentItems) {

            const deploymentItem: DeploymentItem = {
                deploymentId: id,
                stepId: item.stepId,
                itemState: item.itemState,
                integrator: item.itegrator,
                date: (item.date == null ? null : new Date(item.date)),
                note: item.note,
                noteIntegrator: item.noteIntegrator,
                noteDate: (item.noteDate == null ? null : new Date(item.noteDate)) 
            }

            await db
            .transaction('deployment-items', 'readwrite')
            .objectStore('deployment-items')
            .add(deploymentItem);
        }
    }).then(() => {
        const fileInput = document.getElementById("select-file") as HTMLInputElement;
        fileInput.value = null;
        $('#file-name').html(`<em>No file selected.</em>`);
        $('#importDeploymentBtn').attr('disabled', 'disabled');
        document.getElementById('status-text').innerHTML = "Import Complete";
    })
}