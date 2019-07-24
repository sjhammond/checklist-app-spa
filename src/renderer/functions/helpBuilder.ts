import { loadHelpEvents } from "./helpEvents";
import { scrollToTop } from "./helpers/scrollToTop";

export const renderHelpPage = () => {

    //set release version variable here
    const releaseVersion:string = "2019 R2";

    scrollToTop(); 

    const main = document.getElementById('main-content');    
    main.innerHTML = `
        <div id="help-container">
            <h1 class="title"> About & help </h1>
            <span id="help_subhead">Select a topic from the list below.</span>
            <div class='help-topic'>
                <div class='topic-selector'>
                    <button class='checklist-item__expand' aria-label='Show topic' title='Show more information'>
                        <span class='line'></span>
                    </button>
                    <div class='help-topic__title'>Application purpose</div>
                </div>
                <div class='help-content'>
                    <p>Milestone Deployment Assistant is designed to assist technicians and engineers prepare, install, configure, and otherwise deploy Milestone XProtect VMS ${releaseVersion} systems. The application provides an interactive deployment checklist that refrences and supplements Milestone manuals, guides, and whitepapers with practical advice and suggestions on how to best deploy XProtect VMS.</p>
                    <p>The tasks and steps included in this application target the Milestone Certified Integration Technician (MCIT) level. In other words, this application is appropriate for single-server to multi-server medium-complexity installations.</p>
                    <p>Milestone Certified Integration Technicians and Engineers can use this applicaiton as a technical design and installation reference for the following tasks:</p>
                    <ul>
                        <li>Planning</li>
                        <li>Installing</li>
                        <li>Servicing</li>
                        <li>Expanding</li>
                    </ul>
                    <p>Further, this application allows you print the deployment checklist you complete as a PDF for use during a Final Acceptance Test (FAT).</p>
                </div>
            </div>
            <div class='help-topic'>
                <div class='topic-selector'>
                    <button class='checklist-item__expand' aria-label='Show topic' title='Show more information'>
                        <span class='line'></span>
                    </button>
                    <div class='help-topic__title'>How to use this application</div>
                </div>
                <div class='help-content'>
                    Test
                </div>
            </div>
            <div class='help-topic'>
            <div class='topic-selector'>
                <button class='checklist-item__expand' aria-label='Show topic' title='Show more information'>
                    <span class='line'></span>
                </button>
                <div class='help-topic__title'>Accessing additonal resources</div>
            </div>
            <div class='help-content'>
                Test
            </div>
        </div>
        </div>
    `
    loadHelpEvents();
} 