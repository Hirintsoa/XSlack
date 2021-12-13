const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);

const Channel = sequelize.define('channel', {
  title: {
      type: Sequelize.STRING,
      allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  },
  creator: {
      type: Sequelize.STRING,
      allowNull: false
  }
});

export default Channel;