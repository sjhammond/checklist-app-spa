import $ from 'jquery';
import { ProductTier } from "../models/product-tier";
import { Deployment } from "../models/deployment";
import { dbPromise } from "../data/db";
import { renderChecklist } from "./checklistBuilder";
import { renderChecklistMenu } from "./menuBuilder";

export const addNewDeploymentEvents = () => {

    const name = document.getElementById('deploymentName') as HTMLInputElement;
    const integrator = document.getElementById('integratorName') as HTMLInputElement;

    $('input').on('keyup change', () => {
        const product = document.querySelector('input[name="radio"]:checked') as HTMLInputElement;
        if (product != null && name.value.length >= 1 && integrator.value.length >= 1) {
            $('#newDeploymentBtn').removeAttr('disabled');    
        }
    })

    //prevent default form submission (but keep form validation)
    $('form').submit(e => e.preventDefault());

    // on click, create a new deployment using the params from the html form
    $('#newDeploymentBtn').on('click', () => {
        const product = document.querySelector('input[name="radio"]:checked') as HTMLInputElement;
        if (product != null && name.checkValidity() && integrator.checkValidity()) {
            createDeployment(product.value, name.value, integrator.value);
       }
    })
}

const createDeployment = async (product: string, name: string, integrator: string) => {
    //declare id for function-level scope
    let id: number;

    //create deployment template from params
    const date = new Date();
    const productTier = ProductTier[parseInt(product)];
    const deployment: Deployment = {
        dateCreated: date,
        dateModified: date,
        name: name,
        currentPhaseId: 1,
        integrator: integrator,
        productTier: ProductTier[productTier as keyof typeof ProductTier],
        headerImage: null, 
        printSignoff: false
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

        //get all the steps from the step table
        const steps = await db
            .transaction('steps', 'readonly')
            .objectStore('steps')
            .getAll();

        //for each step, add a deployment item for this deployment
        for (const step of steps) {
            await db
                .transaction('deployment-items', 'readwrite')
                .objectStore('deployment-items')
                .add({
                    deploymentId: id,
                    stepId: step.id,
                    itemState: 0,
                    integrator: null,
                    date: null,
                    note: null,
                    noteIntegrator: null,
                    noteDate: null
                });
        }
        return id.toString();
    })
        //go to deployment checklist
        .then(id => {
            renderChecklist(id);
            renderChecklistMenu(id);
        });
}