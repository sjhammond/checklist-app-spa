import $ from 'jquery';
import { createDeployment } from './newDeploymentEvents';

export const renderCreateDeployment = () => {

    const main = document.getElementById('main-content')
    main.innerHTML = `
        <form id="new-deployment__form">
            <h1 id="header-title">New Deployment</h1>
            <span>Select your XProtect product:</span>
            <div class="radio-tile-group">
                <div class="input-container">
                    <input id="essential-plus" class="radio-button" type="radio" name="radio" value="1" required />
                    <div class="radio-tile">
                        <div class="icon" id="essential-icon"></div>
                        <label for="Essential+" class="radio-tile-label">Essential+</label>
                    </div>
                </div>
                <!--radio-input-->
                <div class="input-container">
                    <input id="express-plus" class="radio-button" type="radio" name="radio" value="2" required />
                    <div class="radio-tile">
                        <div class="icon" id="express-icon"></div>
                        <label for="Express+" class="radio-tile-label">Express+</label>
                    </div>
                </div>
                <!--radio-input-->
                <div class="input-container">
                    <input id="professional-plus" class="radio-button" type="radio" name="radio" value="3" required />
                    <div class="radio-tile">
                        <div class="icon" id="professional-icon"></div>
                        <label for="Professional+" class="radio-tile-label">Professional+</label>
                    </div>
                </div>
                <!--radio-input-->
                <div class="input-container">
                    <input id="expert" class="radio-button" type="radio" name="radio" value="4" required />
                    <div class="radio-tile">
                        <div class="icon" id="expert-icon"></div>
                        <label for="Expert" class="radio-tile-label">Expert</label>
                    </div>
                </div>
                <!--radio-input-->
                <div class="input-container">
                    <input id="corporate" class="radio-button" type="radio" name="radio" value="5" required />
                    <div class="radio-tile">
                        <div class="icon" id="corporate-icon"></div>
                        <label for="Corporate" class="radio-tile-label">Corporate</label>
                    </div>
                </div>
                <!--radio-input-->
            </div>
            <!--radio-tile-group-->
            <span>Name your deployment:</span>
            <input id="deploymentName" type="text" required minlength="2" maxlength="96" />
            <span>What is the name of the integrator working on this project?</span>
            <input id="integratorName" type="text" required minlength="2" maxlength="96" />
            <button id="newDeploymentBtn" class="primary-btn" type="submit">Create Checklist</button>
        </form>
    `

    //load svg images
    $("#essential-icon").load("./svg/essential.svg");
    $("#express-icon").load("./svg/express.svg");
    $("#professional-icon").load("./svg/professional.svg");
    $("#expert-icon").load("./svg/expert.svg");
    $("#corporate-icon").load("./svg/corporate.svg");

    //prevent default form submission (but keep form validation!)
    $('form').submit(e => e.preventDefault());

    // on click, create a new deployment using the params from the html form
    $('#newDeploymentBtn').on('click', () => {
        const product = document.querySelector('input[name="radio"]:checked') as HTMLInputElement;
        const name = document.getElementById('deploymentName') as HTMLInputElement;
        const integrator = document.getElementById('integratorName') as HTMLInputElement;
        if (product != null && name.checkValidity() && integrator.checkValidity()) {
            createDeployment(product.value, name.value, integrator.value);
        }
    })
}