require("dotenv").config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);

const User = sequelize.define('user', {
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false
  },
  salt: {
      type: Sequelize.STRING,
      allowNull: false
  },
  picPath: {
    type: Sequelize.STRING,
    defaultValue: 'default.png'
  }
});

module.exports = User;