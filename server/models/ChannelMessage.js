const {DataTypes} = require('sequelize');

const ChannelMessageFields = {
  content: {
      type: DataTypes.STRING,
      allowNull: false
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  recipient: {
      type: DataTypes.INTEGER,
      allowNull: false
  }
};

module.exports = ChannelMessageFields;