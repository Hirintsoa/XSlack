// BASIC PACKAGES
const express = require('express');
const cors = require('cors');

// ROUTERS
const AuthRouter = require('./routes/index');
const UserRouter = require('./routes/Users');
const ChannelRouter = require('./routes/Channels');
const MessageRouter = require('./routes/Messages');
const ChannelMessageRouter = require('./routes/ChannelMessages');

// Environment variable loader setup
require('dotenv').config();

// API start setup
const app = express();
app.use(cors());
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());

// API ROUTES
app.use('/', AuthRouter);
app.use('/users', UserRouter);
app.use('/channels', ChannelRouter);
app.use('/messages', MessageRouter);
app.use('/CM', ChannelMessageRouter);

// LAUNCH SERVER
app.listen(process.env.SERVER_PORT, () => console.log(`API available on http://localhost:${process.env.SERVER_PORT}`));

// REALTIME CHAT SETUP
const http = require('http').createServer(app);
const realtimeChat = require('./utils/chat');

realtimeChat(http);