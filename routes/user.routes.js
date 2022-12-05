module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const router = require("express").Router();
    // Create a new User
    router.post("/", user.create);
    // Retrieve all User
    router.get("/", user.findAll);
    router.get("/:username", user.findOne);
    router.put("/:username", user.update);
    router.post("/login", user.signin);
    router.delete("/:username", user.delete);
    app.use('/api/user', router);
};