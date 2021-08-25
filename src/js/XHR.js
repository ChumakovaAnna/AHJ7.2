/* eslint-disable class-methods-use-this */
const server = "https://git.heroku.com/ahj7-1.git";
// const server = "http://localhost:7070/";

export default class XHR {
  addTicket(name, description) {
    return new Promise((resolve) => {
      const params = new URLSearchParams();
      params.append("name", name);
      params.append("description", description);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${server}/`);
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          return resolve(xhr.responseText);
        }
        console.log(xhr.responseText);
        return xhr.responseText;
      });
      xhr.send(params);
    });
  }

  getTickets() {
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `${server}/?method=allTickets`);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const tickets = JSON.parse(xhr.responseText);
          return resolve(tickets);
        }
        console.log(xhr.responseText);
        return xhr.responseText;
      });
      xhr.send();
    });
  }

  changeTickets(id, name, description) {
    return new Promise((resolve) => {
      const params = new URLSearchParams();
      params.append("id", id);
      params.append("name", name);
      params.append("description", description);

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", `${server}/`);
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          return resolve(xhr.responseText);
        }

        console.log(xhr.responseText);
        return xhr.responseText;
      });
      xhr.send(params);
    });
  }

  getFullTicket(id) {
    return new Promise((resolve) => {
      const params = new URLSearchParams();
      params.append("id", id);
      params.append("method", "ticketById");

      const xhr = new XMLHttpRequest();
      xhr.open("GET", `${server}/?${params}`);
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const tickets = JSON.parse(xhr.responseText);
          return resolve(tickets[0]);
        }

        console.log(xhr.responseText);
        return xhr.responseText;
      });
      xhr.send();
    });
  }

  deleteTicket(id) {
    return new Promise((resolve) => {
      const params = new URLSearchParams();
      params.append("id", id);

      const xhr = new XMLHttpRequest();
      xhr.open("DELETE", `${server}/?${params}`);
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const tickets = xhr.responseText;
          return resolve(tickets);
        }

        console.log(xhr.responseText);
        return xhr.responseText;
      });
      xhr.send();
    });
  }

  changeStatus(id, status) {
    return new Promise((resolve) => {
      const params = new URLSearchParams();
      params.append("id", id);
      params.append("status", status);

      const xhr = new XMLHttpRequest();
      xhr.open("PATCH", `${server}/?${params}`);
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const tickets = xhr.responseText;
          return resolve(tickets);
        }

        console.log(xhr.responseText);
        return xhr.responseText;
      });
      xhr.send();
    });
  }
}
