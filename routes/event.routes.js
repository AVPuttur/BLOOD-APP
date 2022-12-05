module.exports = app => {
    const event = require("../controllers/event.controller.js");
    const router = require("express").Router();
    // Create a new User
    router.post("/", event.create);
    // Retrieve all User
    router.get("/", event.findAll);
    router.get("/:event", event.findOne);
    router.put("/:event", event.update);
    router.delete("/:event", event.delete);
    app.use('/api/event', router);
};