const { Channel, ChannelUser, Invitation } = require("../models");

class InvitationController {
    constructor() {
        this.response = { status: 200, message: ""};
    }

    createNewInvitation(InvitationObject) {
        let { channel, initiator, guest } = InvitationObject;
        const newInvitation = Invitation.build({ channel, initiator, guest, state: false });
        newInvitation.save();
    }
}

module.exports = InvitationController;