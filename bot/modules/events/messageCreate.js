const { Events, ChannelType } = require("discord.js");
const { BotEvent } = require("@disqada/halfbot");

/** @type { import("@disqada/halfbot").BotEventData } */
const data = {
    name: Events.MessageCreate
};

/**
 * @param { import("@disqada/halfbot").DiscordBot } bot
 * @param { import("discord.js").Message } message
 */
async function execute(bot, message) {
    if (
        message.channel.type === ChannelType.GuildAnnouncement &&
        message.crosspostable
    ) {
        await message.crosspost();
    }
}

module.exports = new BotEvent(data, execute);
