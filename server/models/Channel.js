const {DataTypes} = require('sequelize');

const ChannelFields = {
  title: {
      type: DataTypes.STRING,
      allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  creator: {
      type: DataTypes.STRING,
      allowNull: false
  }
};

module.exports = ChannelFields;