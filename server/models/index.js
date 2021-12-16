require("dotenv").config();
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL, {
    define: {
      freezeTableName: true
    },
    pool: {
        max: 125,
        idle: 30000,
        acquire: 90000,
    }
});

// DATABASE TABLES FIELDS REFERENCES
const UserFields = require("./User");
const ChannelFields = require("./Channel");
const MessageFields = require("./Message");
const ChannelMessageFields = require("./ChannelMessage");
const NotificationFields = require("./Notification");
const InvitationFields = require("./Invitation");

// MODELS INIT
const User = sequelize.define('Users', UserFields);
const Channel = sequelize.define('Channels', ChannelFields);
const Message = sequelize.define('Messages', MessageFields);
const ChannelMessage = sequelize.define('ChannelMessages', ChannelMessageFields);
const Notification = sequelize.define('Notifications', NotificationFields);
const Invitation = sequelize.define('Invitations', InvitationFields);

// JUNCTION BETWEEN USER AND CHANNEL 
const ChannelUser = sequelize.define('ChannelsUsers', {
    UserEmail: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'email'
      }
    },
    ChannelId: {
      type: DataTypes.INTEGER,
      references: {
        model: Channel,
        key: 'id'
      }
    }
});

User.belongsToMany(Channel, { through: ChannelUser });
Channel.belongsToMany(User, { through: ChannelUser });

// CHANNEL MODEL FOREIGN KEY
User.hasOne(Channel, {
    foreignKey: 'creator'
});
Channel.belongsTo(User);

// MESSAGE MODEL FOREIGN KEYS
User.hasMany(Message, {
    foreignKey: 'sender'
});
Message.belongsTo(User);

User.hasMany(Message, {
    foreignKey: 'recipient'
});
Message.belongsTo(User);

// CHANNELMESSAGE MODEL FOREIGN KEYS
User.hasMany(ChannelMessage, {
    foreignKey: 'sender'
});
ChannelMessage.belongsTo(User);

Channel.hasMany(ChannelMessage, {
    foreignKey: 'recipient'
});
ChannelMessage.belongsTo(Channel);

// NOTIFICATION MODEL FOREIGN KEY
User.hasMany(Notification, {
    foreignKey: 'owner'
});
Notification.belongsTo(User);

// INVITATION MODEL FOREIGN KEYS
User.hasMany(Invitation, {
    foreignKey: 'initiator'
});
Invitation.belongsTo(User);

User.hasMany(Invitation, {
    foreignKey: 'guest'
});
Invitation.belongsTo(User);

Channel.hasMany(Invitation, {
    foreignKey: 'channel'
});
Invitation.belongsTo(Channel);

// sequelize.sync().catch(err => console.error(err));
module.exports = { User, Channel, Message, ChannelMessage, ChannelUser, Notification, Invitation };