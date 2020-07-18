const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/users", DevController.index);
routes.post("/user", DevController.store);

routes.get("/search", SearchController.index);

module.exports = routes;
