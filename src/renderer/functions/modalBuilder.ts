import { addEditModalEvents, addDeleteModalEvents, addPrintOptionsModalEvents } from "./modalEvents";
import { dbPromise } from "../data/db";
import { getDeployment } from "./helpers/dbFunctions";
import { createStaticPath } from "./helpers/createStaticPath";

export const showModal = (id: string, modalType: string, context?: string) => {

    //get the modal elements in the app
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-content");

    //render the modal depending on the modalType
    switch (modalType) {

        //DELETE MODAL
        case "delete":
            modalText.innerHTML = `
                <div id="modal__title">Confirm delete</div>
                <div id="modal__message">Are you sure you want to delete this deployment?</div>
                <div id="modal__button-container">
                    <button class="modal-save" id="modal__delete">Delete</button>
                    <button class="modal-cancel" id="modal__cancel-delete">Cancel</button>
                </div>
            `
            //show the modal
            modal.style.display = "flex";

            //add event listeners
            addDeleteModalEvents(id);
            break;

        //EDIT MODAL
        case "edit":
            dbPromise()
                .then(async db => {
                    const deployment = await getDeployment(id, db);
                    modalText.innerHTML = `
                    <div id="modal__title">Edit deployment details</div>
                    <form>
                        <div class="modal__input-container">
                            <label for="edit__deployment-name">Deployment name:</label>
                            <input type="text" id="edit__deployment-name" value="${deployment.name}" required minlength="1" maxlength="50" pattern="[a-zA-Z- +.,()0-9#!*@&?/']+" />
                        </div>
                        <div class="modal__input-container">
                            <label for="edit__product">XProtect&reg; product:</label>
                            <select id="edit__product">
                                <option value="1"${deployment.productTier == 1 ? `selected="selected"` : ``}>Essential+</option>
                                <option value="2"${deployment.productTier == 2 ? `selected="selected"` : ``}>Express+</option>
                                <option value="3"${deployment.productTier == 3 ? `selected="selected"` : ``}>Professional+</option>
                                <option value="4"${deployment.productTier == 4 ? `selected="selected"` : ``}>Expert</option>
                                <option value="5"${deployment.productTier == 5 ? `selected="selected"` : ``}>Corporate</option>
                            </select>
                        </div>
                        <div class="modal__input-container">
                            <label for="edit__integrator">Integrator name:</label>
                            <input type="text" id="edit__integrator" value="${deployment.integrator}" required minlength="1" maxlength="50" pattern="[a-zA-Z- +.,()0-9#!*@&?/']+"/>
                        </div>
                        <div id="modal__button-container">
                            <button class="modal-save" id="modal__save-edit" type="submit" disabled>Save Changes</button>
                            <button class="modal-cancel" id="modal__cancel-edit">Cancel</button>
                        </div>
                    </form>
                `

                    //show the modal
                    modal.style.display = "flex";

                    //add event listeners
                    addEditModalEvents(deployment, context);
                })

            break;

        //PRINT MODAL
        case 'print-options':
            dbPromise()
                .then(async db => {
                    const deployment = await getDeployment(id, db);
                    modalText.innerHTML = `
                        <div id="modal__title">Print options</div>
                        <form>
                            <div id="modal__image-upload">
                                <span>Change print header logo:</span>
                                <div id="image-preview-container">
                                    <span class="image-align-helper"></span>
                                    <img id="header-image-preview" src=${deployment.headerImage != null ? deployment.headerImage : createStaticPath('./images/logo.png')}></img>
                                </div>
                                <input type="file" id="image-upload" accept="image/png,image/jpeg"></input>
                                <label for="image-upload" class="modal-save" id="custom-upload-btn">Select Image (.jpeg, .png)</label>
                                <button id="reset-image">Reset to Default</button>
                            </div>
                            <div id="modal__signoff">
                                <input type="checkbox" id="signoff-checkbox" ${deployment.printSignoff == true ? 'checked' : ''}/>
                                <label for="signoff-checkbox" class="checkbox"></label>
                                <span>Include customer sign-off page</span> 
                            </div>
                            <div id="modal__button-container">
                                <button class="modal-save" id="modal__save-options" type="submit" disabled>Save Changes</button>
                                <button class="modal-cancel" id="modal__cancel-options">Cancel</button>
                            </div>
                        </form>
                    `

                    //show the modal
                    modal.style.display = "flex";

                    //add event listeners
                    addPrintOptionsModalEvents(id);
                })
    }
}