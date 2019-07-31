import $ from 'jquery';
import { renderChecklist } from "./checklistBuilder";
import { renderPrintView } from './printViewBuilder';
import { renderChecklistMenu, renderPrintMenu } from './menuBuilder';
import { showModal } from './modalBuilder';
import { dbPromise } from '../data/db';
import { getDeployment } from './helpers/dbFunctions';
import { exportDeploymentData } from './menuEvents';


export const addDeploymentListEventListeners = async () => {

  //add edit functionality to each edit button in the table
  $('.edit-btn').click(async function () {
    event.stopPropagation();
    const deploymentId = this.dataset.id;
    showModal(deploymentId, "edit", "deploymentList");
  })

  //add delete functionality to each delete button in the table 
  $('.delete-btn').click(async function () {
    event.stopPropagation();
    const deploymentId = this.dataset.id;
    showModal(deploymentId, "delete");
  })

  //add export functionality to each export button in the table 
  $('.export-btn').click(async function () {
    event.stopPropagation();
    const deploymentId = this.dataset.id;
    dbPromise().then(async db => {
      const deployment = await getDeployment(deploymentId, db);
      await exportDeploymentData(deployment);
    })
  })

  //add print functionality to each print button in the table
  $('.print-btn').click(async function () {
    event.stopPropagation();
    const deploymentId = this.dataset.id;
    renderPrintView(deploymentId);
    renderPrintMenu(deploymentId, "deploymentList");
  })

  //add the "go to Checklist" click event to each table row
  $('.deployment').click(async function () {
    const deploymentId = this.dataset.id;
    renderChecklist(deploymentId);
    renderChecklistMenu(deploymentId);
  })
}