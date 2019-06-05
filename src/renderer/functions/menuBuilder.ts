import $ from 'jquery';
import { renderDeploymentList } from './deploymentListBuilder';
import { renderCreateDeployment } from './newDeploymentBuilder';

export const renderMainMenu = () => {
    //render the main menu html
    const menu = document.getElementById('menu'); 
    menu.innerHTML = `
        <div id="inner-menu">
            <ul id="menu-list">
                <li class="menu-item" id="menu_deployment-list">Load Deployment</li>
                <li class="menu-item" id="menu_new-deployment">New Deployment</li>
                <li class="menu-item" id="menu_settings">Settings</li>
                <li class="menu-item" id="menu_about">About</li>
            </ul>
        </div> 
    `
    //attach event listeners
    $('#menu_deployment-list').click(() => renderDeploymentList());
    $('#menu_new-deployment').click(() => renderCreateDeployment());
}

export const renderChecklistMenu = () => {
    const menu = document.getElementById('menu');
    menu.innerHTML = `
        <div id="inner-menu">
            <ul id="menu-list">
                <li class="menu-item" id="menu_deployment-list">Load Deployment</li>
                <li class="menu-item" id="menu_new-deployment">New Deployment</li>
                <li class="menu-item" id="menu_settings">Settings</li>
                <li class="menu-item" id="menu_about">About</li>
            </ul>
        </div> 
    `
}