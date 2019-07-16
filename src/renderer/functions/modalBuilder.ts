import { addModalEventListeners } from "./modalEvents";

export const showModal = (id: string, modalType: string) => {

    //get the modal elements
    const modal = document.getElementById("modal");
    const modalClose = document.getElementById("modal-close");
    const modalText = document.getElementById("modal-content");

    if (modalType == "delete") {
        modalText.innerHTML = `
                <div>Confirm Delete</div>
                <div>Are you sure you want to delete this delployment?</div>
                <button id="modal__delete-button">Delete</button>
                <button id="modal__cancel-button">Cancel</button>
        `
    } else if (modalType == "edit") {
        modalText.innerHTML = `
                <form>
                    <div>Edit Deployment</div>
                    <label for="edit__name">Deployment Name</label>
                    <input type="text" id="edit__name" />
                    <label for="edit__product">XProtect&reg; Product</label>
                    <select id="edit__product">
                        ${generateProductList()}
                    </select>
                </form>
        `
    }

    //show the modal
    modal.style.display = "flex";

    // When the user clicks on X or cancel, close the modal
    modalClose.onclick = function () {
        modal.style.display = "none";
    }

    //add event listeners
    addModalEventListeners(id);

}

const generateProductList = () => {
    return `<option value='1'>Essential+</option>`
}