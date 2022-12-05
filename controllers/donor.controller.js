const db = require("../models");
const bcrypt = require ('bcrypt');
const Donor = db.donor;
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
      const donor = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email, 
        password: hashedPassword,
        contactno: req.body.phoneno,
        age: req.body.age,
        bgroup: req.body.group,
        lastDonation: req.body.donateDate,
        role: req.body.role,
        organiser: req.body.organiser,
        region: req.body.region
      };

      console.log(donor);
      // Save intervention in the database
      Donor.create(donor)
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
    const username = req.query.email;
    console.log(username);
    var condition = username ? { email: { [Op.like]: `%${username}%` } } : null;
    Donor.findAll({ where: condition })
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
  Donor.findOne({
    where: {
      username: req.body.email
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
  Donor.update(req.body, {
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
  const id = req.params.email;
  console.log(id);
  Donor.findAll({
    where: {
      email: id
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
  Donor.destroy({
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