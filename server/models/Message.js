const {DataTypes} = require('sequelize');

const MessageFields = {
  content: {
      type: DataTypes.STRING,
      allowNull: false
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recipient: {
      type: DataTypes.STRING,
      allowNull: false
  }
};

module.exports = MessageFields;