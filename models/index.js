const dbConfig = require("../dbconfig");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.sql.databse, dbConfig.sql.user, dbConfig.sql.password, {
  host: dbConfig.sql.server,
  port: dbConfig.sql.port,
  dialect: "mssql",
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.donor = require("./donor.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
module.exports = db;