const {DataTypes} = require('sequelize');

const InvitationFields = {
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  initiator: {
      type: DataTypes.STRING,
      allowNull: false
  },
  guest: {
    type: DataTypes.STRING,
    allowNull: false
  },
  channel: {
      type: DataTypes.INTEGER,
      allowNull: false
  }
};

module.exports = InvitationFields;