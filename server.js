const http = require("http");
const Koa = require("koa");
const koaBody = require("koa-body");
const TicketsList = require("./TicketsList");

const app = new Koa();
const ticketsList = new TicketsList();
ticketsList.add("First", "Sample for testing");
ticketsList.add("Second", "Sample for testing two");

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
  // text: true,
}));

app.use(async (ctx, next) => {
  const origin = ctx.request.get("Origin");
  if (!origin) {
    return await next();
  }
  const headers = { "Access-Control-Allow-Origin": "*" };

  if (ctx.request.method !== "OPTIONS") {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get("Access-Control-Request-Method")) {
    ctx.response.set({
      ...headers,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
    });

    if (ctx.request.get("Access-Control-Request-Headers")) {
      ctx.response.set("Access-Control-Allow-Headers", ctx.request.get("Access-Control-Request-Headers"));
    }
    ctx.response.status = 204;
  }
});

app.use(async (ctx) => {
  const { method } = ctx.request.querystring;

  switch (method) {
    case "allTickets": {
      ctx.response.body = ticketsList.data;
      break;
    }

    case "ticketById": {
      const { id } = ctx.request.query;
      ctx.response.body = ticketsList.byId(id);
      break;
    }

    case "createTicket": {
      const { name, description } = ctx.request.query;
      ticketsList.add(name, description);
      ctx.response.body = ticketsList;
      break;
    }

    default: {
      ctx.response.status = 404;
    }
  }
});

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback()).listen(port);
