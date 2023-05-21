const { Events } = require("discord.js");
const { BotEvent } = require("@disqada/halfbot");
const { setTimeout } = require("timers/promises");

/** @type { import("@disqada/halfbot").BotEventData<"ready"> } */
const data = {
    name: Events.ClientReady
};

/** @type { import("@disqada/halfbot").BotEventFunction<"ready"> } */
async function execute(bot) {
    const guildId = bot?.info?.supportGuildId;
    if (!guildId) {
        throw new Error("Support guild id was not provided");
    }

    /** @type { import("discord.js").Guild } */
    let guild = bot.client.guilds.cache.get(guildId);
    if (!guild) {
        guild = await bot.client.guilds.fetch(guildId);
        if (!guild) {
            throw new Error("Couldn't find support guild");
        }
    }

    // @ts-expect-error
    const channelId = bot?.vars?.chatChannelId;
    if (!channelId) {
        throw new Error("Chat channel id was not provided");
    }

    let channel = guild.channels.cache.get(channelId);
    if (!channel || !("send" in channel)) {
        channel = await guild.channels.fetch(channelId);
        if (!channel || !("send" in channel)) {
            throw new Error("Couldn't find welcoming channel");
        }
    }

    // @ts-expect-error
    const delay = bot?.vars?.azkarDelay * 1000;
    // @ts-expect-error
    const max = bot?.vars?.azkar.length;

    // eslint-disable-next-line no-constant-condition
    while (true) {
        await setTimeout(delay);

        const rand = Math.floor(Math.random() * max);
        /** @type { import("discord.js").APIEmbed } */
        let embed = {
            // @ts-expect-error
            description: bot?.vars?.azkar[rand]
        };

        if (bot.style) {
            embed = bot.style.applyToEmbed(embed);
        }

        await channel.send({ embeds: [embed] });
    }
}

module.exports = new BotEvent(data, execute);
