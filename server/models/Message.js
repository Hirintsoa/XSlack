const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);

const Message = sequelize.define('message', {
  content: {
      type: Sequelize.STRING,
      allowNull: false
  },
  sender: {
    type: Sequelize.STRING,
    allowNull: true
  },
  recipient: {
      type: Sequelize.STRING,
      allowNull: false
  }
});

export default Message;