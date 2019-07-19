import { scrollToTop } from './helpers/scrollToTop';
import { addImportDeploymentEvents } from './importDeploymentEvents';

export const renderImportDeployment = () => {

    //reset scroll postiion of main-content component
    scrollToTop(); 

    //render the create deployment form html
    const main = document.getElementById('main-content')
    main.innerHTML = `
        <form id="import-deployment__form">
            <h1 class="title">Import Deployment</h1>
            <span>Select a Milestone deployment data (.mddata) file to import:</span>
            <div id="select-file-container">
                <label for="select-file" id="file-browser">Browse</label>
                <span id="file-name"><em>No file selected.</em></span>
                <input id="select-file" type="file" accept=".mddata"/>
            </div>
            <button id="importDeploymentBtn" class="primary-btn" type="submit" disabled>Import Deployment</button>
            <div id="status-text"></div>
        </form>
    `
    addImportDeploymentEvents(); 

}