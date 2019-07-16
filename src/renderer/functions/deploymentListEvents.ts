import $ from 'jquery';
import { renderChecklist } from "./checklistBuilder";
import { renderPrintView } from './printViewBuilder';
import { renderChecklistMenu } from './menuBuilder';
import { showModal } from './modalBuilder';


export const addDeploymentListEventListeners = async () => {

  //add edit functionality to each edit button in the table
  $('.edit-btn').click(async function () {
    event.stopPropagation();
    const deploymentId = this.dataset.id;
    showModal(deploymentId, "edit");
  })

  //add delete functionality to each delete button in the table 
  $('.delete-btn').click(async function () {
    event.stopPropagation();
    const deploymentId = this.dataset.id;
    showModal(deploymentId, "delete");
  })

  //add print functionality to each print button in the table
  $('.print-btn').click(async function () {
    event.stopPropagation();
    const deploymentId = this.dataset.id;
    renderPrintView(deploymentId);
  })

  //add the "go to Checklist" click event to each table row
  $('.deployment').click(async function () {
    const deploymentId = this.dataset.id;
    renderChecklist(deploymentId);
    renderChecklistMenu(deploymentId);
  })
}