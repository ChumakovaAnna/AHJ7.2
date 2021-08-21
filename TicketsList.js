const Ticket = require("./Ticket");

class TicketsList {
  constructor() {
    this.data = [];
  }

  add(name, description) {
    const newTicket = new Ticket(name, description);
    this.data.push(newTicket);
  }

  dyId(id) {
    const ticket = this.data.filter((ele) => ele.id === id);
    return ticket;
  }

  delete(id) {
    const newData = this.data.filter((ele) => ele.id !== id);
    this.data = newData;
  }

  allTickets() {
    return this.data;
  }
}

module.exports = TicketsList;
