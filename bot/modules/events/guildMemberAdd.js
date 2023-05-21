const { Events } = require("discord.js");
const { BotEvent } = require("@disqada/halfbot");

/** @type { import("@disqada/halfbot").BotEventData<"guildMemberAdd"> } */
const data = {
    name: Events.GuildMemberAdd
};

/** @type { import("@disqada/halfbot").BotEventFunction<"guildMemberAdd"> } */
async function execute(bot, member) {
    // @ts-expect-error
    const channelId = bot?.vars?.welcomeChannelId;
    if (!channelId) {
        throw new Error("Welcome channel id is not provided");
    }

    let channel = member.guild.channels.cache.get(channelId);
    if (!channel || !("send" in channel)) {
        channel = await member.guild.channels.fetch(channelId);
        if (!channel || !("send" in channel)) {
            throw new Error("Couldn't find welcoming channel");
        }
    }

    /** @type { import("discord.js").APIEmbed } */
    let embed = {
        title: "مرحباً :hugging:",
        description:
            "الرجاء قراءة القوانين في <#971737134010601502> والإلتزام بها\nلقد أصبحت جزءا من مجتمع محرك جودوت العربي"
    };

    if (bot.style) {
        embed = bot.style.applyToEmbed(embed);
    }

    /** @type { import("discord.js").MessageCreateOptions } */
    const message = {
        content: `<@${member.user.id}>`,
        embeds: [embed]
    };

    await channel.send(message);
}

module.exports = new BotEvent(data, execute);
