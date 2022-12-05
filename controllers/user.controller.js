const db = require("../models");
const bcrypt = require ('bcrypt');
const User = db.user;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create and Save a new Intervention
exports.create = async (req, res) => {
    if (!req.body.fname) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Create an intervention
      const user = {
          firstname: req.body.fname,
          lastname: req.body.lname,
          password: hashedPassword,
          email: req.body.email,
          phone: req.body.phone,
          gender: req.body.gender
      };

      console.log(user);
      // Save intervention in the database
      User.create(user)
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
    const username = req.query.lname;
    console.log(username);
    var condition = username ? { lname: { [Op.like]: `%${username}%` } } : null;
    User.findAll({ where: condition })
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

// exports.findOne = (req,res) => {
//   const userOne =  req.body.username;
//   //check to see if the user exists in the list of registered users
//   User.findByPk(userOne)
//     .then(data => {
//       res.send(data);
//       console.log(data.password)
//       if (bcrypt.compare(req.body.password, data.password)) {
//         const accessToken = generateAccessToken ({username: req.body.username})
//         const refreshToken = generateRefreshToken ({username: req.body.username})
//         res.json ({accessToken: accessToken, refreshToken: refreshToken})
//       } 
//       else {
//       res.status(401).send("Password Incorrect!")
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving User with id=" + userOne
//       });
//     });
// };

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: 86400 // 24 hours
      });
      console.log(token);
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
  }
// Update User from the database.
exports.update = (req, res) => {
  const id = req.params.email;
  User.update(req.body, {
    where: { email: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
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
  const id = req.params.lname;
  console.log(id);
  User.findAll({
    where: {
      lname: id
    }
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with name=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.username;
  console.log(id);
  User.destroy({
    where: { email: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};