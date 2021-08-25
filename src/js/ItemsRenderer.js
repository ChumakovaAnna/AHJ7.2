/* eslint-disable class-methods-use-this */
export default class ItemsRenderer {
  constructor() {
    this.container = document.querySelector("#tickets-list");
  }

  render(arrTicket) {
    this.container.innerHTML = "";
    arrTicket.forEach((item) => {
      const date = new Date(item.created);
      const day = this.convertDate(date.getDate());
      const month = this.convertDate(date.getMonth() + 1);
      const year = this.convertDate(date.getFullYear());
      const hours = this.convertDate(date.getHours());
      const minute = this.convertDate(date.getMinutes());
      const itemCreated = `${day}.${month}.${year} ${hours}:${minute}`;
      const ticket = document.createElement("div");
      ticket.className = "ticket";
      ticket.dataset.id = item.id;
      ticket.innerHTML = `
        <div class="grid-noGutter">
          <div class="col-1">
            <button class="status" data-status="${item.status}"></button>
          </div>
          <div class="col">
            <div class="name">${item.name}</div>
          </div>
          <div class="col">
            <div class="created">${itemCreated}</div>
          </div>
          <div class="col-1">
            <div class="change-del">
              <button class="edit">
                <img src="src/img/edit.png" data-btn="edit" alt="add">
              </button>
              <button class="delete">
                <img src="src/img/delete.png" data-btn="delete" alt="add">
              </button>
            </div>
          </div>
        </div>
        `;
      this.container.insertAdjacentElement("beforeend", ticket);
    });
  }

  convertDate(value) {
    const newValue = value < 10 ? `0${value}` : value;
    return newValue;
  }
}
