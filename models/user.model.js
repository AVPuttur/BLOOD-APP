module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("tbl_users", {
      uid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: "admin"
      },
      phone: {
        type: Sequelize.INTEGER
      },
    });
   return User;
  };


