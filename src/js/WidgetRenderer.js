import ItemsRenderer from "./ItemsRenderer";
import Popover from "./Popover";
import ModalToDelete from "./ModalToDelete";
import XHR from "./XHR";

const itemsRenderer = new ItemsRenderer();
const popup = new Popover(document.body);
const modalToDelete = new ModalToDelete();
const xhrClass = new XHR();

export default class WidgetRenderer {
  constructor() {
    this.container = document.querySelector("#tickets-list");
    this.buttonAdd = document.querySelector("#add");
    this.id = null;
    this.itemIndex = null;
  }

  async init() {
    const arrTickets = await xhrClass.getTickets();

    itemsRenderer.render(arrTickets);

    popup.bindToDOM();
    popup.saveProduct(this.saveItem.bind(this));
    this.inputName = document.querySelector("#name");
    this.inputDescription = document.querySelector("#description");
    this.popupTitle = document.querySelector("#title-popup");
    modalToDelete.init();
    this.eventsGoods();
  }

  eventsGoods() {
    this.container.addEventListener("click", async (event) => {
      const { target } = event;
      const targetClass = target.classList;
      this.id = target.closest(".ticket").dataset.id;

      // change status
      if (targetClass.contains("status")) {
        const itemStatus = target.dataset.status;
        const newStatus = itemStatus === "true" ? "false" : "true";
        await xhrClass.changeStatus(this.id, newStatus);
        WidgetRenderer.itemsRender();
      }

      // change item
      if (target.dataset.btn === "edit") {
        const item = await xhrClass.getFullTicket(this.id);
        this.inputName.value = item.name;
        this.inputDescription.value = item.description;
        this.popupTitle.innerText = "Изменить тикет";
        popup.showPopup();

        WidgetRenderer.itemsRender();
      }

      // delete item
      if (target.dataset.btn === "delete") {
        modalToDelete.makeVisible(this.deleteItem.bind(this));
      }

      // get description
      if (targetClass.contains("name")) {
        const descriptionItem = target.parentNode.querySelector(".description");
        if (!descriptionItem) {
          const ticket = await xhrClass.getFullTicket(this.id);
          const { description } = ticket;
          const elementHTML = document.createElement("div");
          elementHTML.className = "description";
          elementHTML.innerHTML = `
          <p>${description}</p>
          `;
          target.parentNode.appendChild(elementHTML);
        } else {
          descriptionItem.classList.toggle("hidden");
        }
      }
    });

    this.buttonAdd.addEventListener("click", () => {
      this.id = null;
      this.popupTitle.innerText = "Добавить тикет";
      popup.showPopup();
    });
  }

  async deleteItem() {
    await xhrClass.deleteTicket(this.id);
    WidgetRenderer.itemsRender();
  }

  static async itemsRender() {
    const arrTickets = await xhrClass.getTickets();
    itemsRenderer.render(arrTickets);
  }

  async saveItem() {
    if (this.id !== null) {
      // change item
      await xhrClass.changeTickets(this.id, this.inputName.value, this.inputDescription.value);
    } else {
      // save new item
      await xhrClass.addTicket(this.inputName.value, this.inputDescription.value);
    }

    WidgetRenderer.itemsRender();
  }
}
