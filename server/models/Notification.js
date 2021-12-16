const {DataTypes} = require('sequelize');

const NotificationFields = {
  title: {
      type: DataTypes.STRING,
      allowNull: false
  },
  type: {
      type: DataTypes.STRING,
      defaultValue: "message",
      isIn: [['message', 'invitation']]
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  owner: {
      type: DataTypes.STRING,
      allowNull: false
  }
};

module.exports = NotificationFields;