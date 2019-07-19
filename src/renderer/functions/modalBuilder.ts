import { addEditModalEvents, addDeleteModalEvents } from "./modalEvents";
import { dbPromise } from "../data/db";
import { getDeployment } from "./helpers/dbFunctions";

export const showModal = (id: string, modalType: string, context?:string) => {

    //get the modal elements in the app
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-content");

    //render the modal depending on the modalType
    switch (modalType) {

        //DELETE MODAL
        case "delete":
            modalText.innerHTML = `
                <div id="modal__title">Confirm Delete</div>
                <div id="modal__message">Are you sure you want to delete this deployment?</div>
                <div id="modal__button-container">
                    <button id="modal__delete">Delete</button>
                    <button id="modal__cancel-delete">Cancel</button>
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
                    <div id="modal__title">Edit Deployment Details</div>
                    <form>
                        <div class="modal__input-container">
                            <label for="edit__deployment-name">Deployment Name</label>
                            <input type="text" id="edit__deployment-name" value="${deployment.name}" required minlength="1" maxlength="50" pattern="[a-zA-Z- +.,()0-9#!*@&?/']+" />
                        </div>
                        <div class="modal__input-container">
                            <label for="edit__product">XProtect&reg; Product</label>
                            <select id="edit__product">
                                <option value="1"${deployment.productTier == 1 ? `selected="selected"` : ``}>Essential+</option>
                                <option value="2"${deployment.productTier == 2 ? `selected="selected"` : ``}>Express+</option>
                                <option value="3"${deployment.productTier == 3 ? `selected="selected"` : ``}>Professional+</option>
                                <option value="4"${deployment.productTier == 4 ? `selected="selected"` : ``}>Expert</option>
                                <option value="5"${deployment.productTier == 5 ? `selected="selected"` : ``}>Corporate</option>
                            </select>
                        </div>
                        <div class="modal__input-container">
                            <label for="edit__integrator">Integrator Name</label>
                            <input type="text" id="edit__integrator" value="${deployment.integrator}" required minlength="1" maxlength="50" pattern="[a-zA-Z- +.,()0-9#!*@&?/']+"/>
                        </div>
                        <div id="modal__button-container">
                            <button id="modal__save-edit" type="submit">Save Changes</button>
                            <button id="modal__cancel-edit">Cancel</button>
                        </div>
                    </form>
                `

                //show the modal
                modal.style.display = "flex";

                //add event listeners
                addEditModalEvents(deployment, context);

            }
        )
    }
}