module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("tbl_events", {
      eid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING
      },
      place: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      organiser: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING,
      }
    });
   return Event;
  };


