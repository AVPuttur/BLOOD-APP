module.exports = (sequelize, Sequelize) => {
    const Donor = sequelize.define("tbl_donors", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      fname: {
        type: Sequelize.STRING
      },
      lname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      contactno: {
        type: Sequelize.INTEGER
      },
      age: {
        type: Sequelize.INTEGER
      },
      bgroup: {
        type: Sequelize.STRING
      },
      lastDonation: {
        type: Sequelize.DATEONLY
      },
      role: {
        type: Sequelize.STRING
      },
      organiser: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      }
    });
    return Donor;
  };