import $ from 'jquery';
import { dbPromise } from '../data/db';
import { Deployment } from '../models/deployment';
import { DeploymentImport } from '../models/deployment-import';
import { DeploymentItem } from '../models/deployment-item';
import { encryptDecryptData } from './helpers/encryptDecryptData';

export const addImportDeploymentEvents = () => {
    const fileInput = document.getElementById("select-file") as HTMLInputElement;

    //prevent default form submission (but keep form validation)
    $('form').submit(e => e.preventDefault());

    //when file upload completes, show filename in the custom field and enable the import button
    $('#select-file').bind('change', () => {
        if(fileInput.files.length == 1){
            const fileName = fileInput.files[0].name; 
            $('#file-name').html(fileName);
             $('#importDeploymentBtn').removeAttr('disabled');
            document.getElementById('status-text').innerHTML = "";
        }
    });

    //on import, read file and add to db
    $('#importDeploymentBtn').on('click', async function(){
        const importFile = fileInput.files[0]; 
        const fr = new FileReader();
        fr.onload = importDeploymentData; 
        fr.readAsText(importFile); 

        async function importDeploymentData() {

            try {
                const decryptedData = encryptDecryptData(fr.result as string, 'decrypt');

                //debug
                //console.log(decryptedData);

                const data:DeploymentImport = JSON.parse(decryptedData as string);
                await importDeployment(data);
            } catch (error){
                //update status text
                document.getElementById('status-text').innerHTML = `
                <svg id="import_error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                <span id="status_error">
                    Uh-oh. Something went wrong.
                </span>
                <div id="error_text"><em>${error}</em></div>
            `;
            
            //clear the import file input and disbale the import button
            fileInput.value = null;
            $('#file-name').html(`<em>No file selected.</em>`);
            $('#importDeploymentBtn').attr('disabled', 'disabled');
            }
        }
    });
}

const importDeployment = (data:DeploymentImport) => {

    let id: number;

    //add the deployment data to the data model
    const deployment: Deployment = {
        dateCreated: new Date(data.deployment.dateCreated),
        dateModified: new Date(data.deployment.dateModified),
        name: data.deployment.name,
        currentPhaseId: data.deployment.currentPhaseId,
        integrator: data.deployment.integrator,
        productTier: data.deployment.productTier,
        headerImage: data.deployment.headerImage,
        printSignoff: data.deployment.printSignoff
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

        //assign the id number
        id = deploymentCursor.value.id;

        //for each deployment item, load it into the data model and add it to the db
        for (var item of data.deploymentItems) {

            const deploymentItem: DeploymentItem = {
                deploymentId: id,
                stepId: item.stepId,
                itemState: item.itemState,
                integrator: (item.integrator == null ? null : item.integrator),
                date: (item.date == null ? null : new Date(item.date)),
                note: (item.note == null ? null : item.note),
                noteIntegrator: (item.noteIntegrator == null ? null : item.noteIntegrator),
                noteDate: (item.noteDate == null ? null : new Date(item.noteDate)) 
            }

            await db
            .transaction('deployment-items', 'readwrite')
            .objectStore('deployment-items')
            .add(deploymentItem);
        }
    }).then(() => {
        //update status text
        document.getElementById('status-text').innerHTML = `
            <svg id="import_complete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <span id="status_complete">
                Import complete
            </span>
        `;

        //clear the import file input and disbale the import button
        const fileInput = document.getElementById("select-file") as HTMLInputElement;
        fileInput.value = null;
        $('#file-name').html(`<em>No file selected.</em>`);
        $('#importDeploymentBtn').attr('disabled', 'disabled');
    })
}