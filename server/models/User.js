const {DataTypes} = require('sequelize');

const UserFields = {
  email: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
      isEmail: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    min: 3,
    max: 17,
    is: /^[a-z0-9_]$/gi
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  },
  salt: {
      type: DataTypes.STRING,
      allowNull: false
  },
  picPath: {
    type: DataTypes.STRING,
    defaultValue: 'default.png'
  }
};

module.exports = UserFields;