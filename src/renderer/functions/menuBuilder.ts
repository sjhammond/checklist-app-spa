export const renderMainMenu = () => {
    const menu = document.getElementById('menu'); 
    menu.innerHTML = `
        <div class="menu-item" id="menu_deployment-list">Load Deployment</div>
        <div class="menu-item" id="menu_new-deployment">New Deployment</div>
        <div class="menu-item" id="menu_settings">Settings</div>
        <div class="menu-item" id="menu_about">About</div>
    `
}

export const renderChecklistMenu = () => {
    const menu = document.getElementById('menu');
    menu.innerHTML = `
        <div class="menu-item" id="menu_return-to-deployments">Return to List</a>
        <div class="menu-item" id="menu_deployment-info" class="menu">
            <span id="menu_deployment-title">Title goes here</span>
            <span id="menu_edit-deployment>Edit Deployment</span>
            <span class="header-progress-count">0/X</span>
            <span class="title-progress-border"></span>
            <span class="title-progress-bar"></span>
        </div>
        <div class="menu-item" id="menu_phases">
        </div>
        <div class="menu-item" id="menu_settings"> Settings</a>
    `
}