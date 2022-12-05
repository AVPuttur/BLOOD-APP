module.exports = app => {
    const donor = require("../controllers/donor.controller.js");
    const router = require("express").Router();
    // Create a new User
    router.post("/", donor.create);
    // Retrieve all User
    router.get("/", donor.findAll);
    router.get("/:username", donor.findOne);
    router.put("/:username", donor.update);
    router.post("/login", donor.signin);
    router.delete("/:username", donor.delete);
    app.use('/api/donor', router);
};