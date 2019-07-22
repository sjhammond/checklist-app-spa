import { loadHelpEvents } from "./helpEvents";

export const renderHelpPage = () => {
    const main = document.getElementById('main-content')
    main.innerHTML = `
        <div id="help-container">
            <h1 class="title"> About & Help </h1>
            <span id="help_subhead">Select a topic from the list below.</span>
            <div class='help-topic'>
                <div class='topic-selector'>
                    <button class='checklist-item__expand' aria-label='Show topic' title='Show more information'>
                        <span class='line'></span>
                    </button>
                    <div class='help-topic__title'>Application Purpose</div>
                </div>
                <div class='help-content'>
                    <p>This application is intended to assist technicians and engineers in preparing, installing, configuring, and otherwise deploying Milestone XProtect VMS 2019 R2 systems.</p>
                    <p>It is intended to supplement to Milestone manuals, guides, and whitepapers with practical advice and suggestions on how to best deploy XProtect VMS. The application provides context for these resources as well as additional references to eLearning courses and non-Milestone resources.</p>
                    <p>The tasks and steps included in this application are targeted to the Milestone Certified Integration Technician (MCIT) level. MCIT-level tasks cover single-server to multi-server medium-complexity installations.</p>
                    <p>Milestone Certified Integration Technicians and Engineers can use this applicaiton as a technical design and installation reference for the following tasks:</p>
                    <ul>
                        <li>Planning</li>
                        <li>Installing</li>
                        <li>Servicing</li>
                        <li>Expanding</li>
                    </ul>
                    <p>Further, this application will allow you print the tasks you complete as a PDF for use during a Final Acceptance Test (FAT).</p>
                </div>
            </div>
            <div class='help-topic'>
                <div class='topic-selector'>
                    <button class='checklist-item__expand' aria-label='Show topic' title='Show more information'>
                        <span class='line'></span>
                    </button>
                    <div class='help-topic__title'>How to Use This Application</div>
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
                <div class='help-topic__title'>Accessing Additonal Resources</div>
            </div>
            <div class='help-content'>
                Test
            </div>
        </div>
        </div>
    `
    loadHelpEvents();
} 