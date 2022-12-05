const db = require("../models");
const Event = db.event;
const Op = db.Sequelize.Op;
require("dotenv").config();

// Create and Save a new Intervention
exports.create = async (req, res) => {
    if (!req.body.fname) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

      // Create an intervention
      const event = {
        title: req.body.title,
        place: req.body.place,
        time: req.body.time,
        date: req.body.date,
        organiser: req.body.organiser,
        region: req.body.region
      };

      console.log(event);
      // Save intervention in the database
      Event.create(event)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
  
};
// Retrieve all Interventions from the database.
exports.findAll = (req, res) => {
    const username = req.query.title;
    console.log(username);
    var condition = username ? { title: { [Op.like]: `%${username}%` } } : null;
    Event.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Users."
        });
      })
  
};

// Update User from the database.
exports.update = (req, res) => {
  const id = req.params.event;
  Event.update(req.body, {
    where: { title: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.event;
  console.log(id);
  Event.findAll({
    where: {
      title: id
    }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Event with name=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.event;
  console.log(id);
  Event.destroy({
    where: { title: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id
      });
    });
};