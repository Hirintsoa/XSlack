const { Channel, ChannelUser } = require("../models");

class ChannelController {
    constructor() {
        this.response = { status: 200, message: ""};
    }
    
    /**
     * Create a new record in the Channel Object and return the corresponding record
     * @param {Object} ChannelObject 
     * @returns {Object} { status, message }
     */
    createNewChannel(ChannelObject) {
        let newChannel = Channel.build(ChannelObject);

        newChannel.save()
            .then(channel => {
                ChannelUser.create({ UserEmail: channel.creator, channelId: channel.id })
                    .then(() => this.response = {status: 201, message: channel })
                    .catch(error => this.response = { status: 500, message: error.name });
            })
            .catch(error => this.response = { status: 500, message: error.name });
        return this.response;
    }

    createNewChannelUser(ChannelUserObject) {
        let newMember = ChannelUser.build(ChannelUserObject);
    }

    /**
     * Find all members of a specified channel
     * @param {*} id specified channel id
     * @returns Members IDs list
     */
    findChannelUsers(id) {
        ChannelUser.findAll({
            where: { channelId: id },
            attributes: ['UserEmail']
        }).then(channels => {
            if (!channels) {
                return this.response = { status: 404, message: error.name };
            }
            this.response.message = channels;
        })
          .catch(error => this.response = { status: 500, message: error.name });
        return this.response;
    }
}

module.exports = ChannelController;