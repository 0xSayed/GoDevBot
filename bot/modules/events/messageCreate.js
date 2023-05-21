const { Events, ChannelType } = require("discord.js");
const { BotEvent } = require("@disqada/halfbot");

/** @type { import("@disqada/halfbot").BotEventData<"messageCreate"> } */
const data = {
    name: Events.MessageCreate
};

/** @type { import("@disqada/halfbot").BotEventFunction<"messageCreate"> } */
async function execute(bot, message) {
    if (
        message.channel.type === ChannelType.GuildAnnouncement &&
        message.crosspostable
    ) {
        await message.crosspost();
    }
}

module.exports = new BotEvent(data, execute);
