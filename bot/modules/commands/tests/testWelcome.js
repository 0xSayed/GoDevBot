const { ApplicationCommandOptionType } = require("discord.js");
const {
    BotCommand,
    BotCommandDeployment,
    BotCommandContextMenuType
} = require("@disqada/halfbot");

const targetCode = "target";

/** @type { import("@disqada/halfbot").BotCommandData } */
const data = {
    name: "test-welcome",
    description: "إختبر الترحيب على عضو",
    dmPermission: false,
    defaultMemberPermissions: ["Administrator"],
    deployment: BotCommandDeployment.DevGuild,
    category: "إختبارات",
    types: {
        chatInput: true,
        contextMenu: BotCommandContextMenuType.User
    },
    options: [
        {
            name: targetCode,
            description: "العضو المرحب به",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ]
};

/** @param { import("@disqada/halfbot").BotCommandInteraction } interaction */
async function execute(interaction) {
    let target;
    if ("targetMember" in interaction) {
        target = interaction.targetMember;
    } else {
        target =
            interaction.options.getMember(targetCode) ?? interaction.member;
    }

    if (!target) {
        throw new Error("لم يتم تحديد عضو");
    }

    const { aFilePath } = require("@disqada/pathfinder");
    // @ts-expect-error
    const welcomeEventFilePath = aFilePath("guildMemberAdd").fullPath;

    /** @type { import("@disqada/halfbot").BotEvent } */
    const welcomeEvent = require(welcomeEventFilePath);

    welcomeEvent.execute(interaction.bot, target);

    /** @type { import("discord.js").InteractionReplyOptions } */
    const replyOptions = {
        // @ts-expect-error
        content: `تم الترحيب ب' ${target.user.tag}'`,
        ephemeral: true
    };

    return replyOptions;
}

module.exports = new BotCommand(data, execute);
