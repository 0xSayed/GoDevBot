const { BotCommand, BotCommandDeployment } = require("@disqada/halfbot");

/** @type { import("@disqada/halfbot").BotCommandData } */
const data = {
	name: "about",
	description: "معلومات عامة عن البوت",
	deployment: BotCommandDeployment.Global,
	category: "معلومات",
	types: {
		chatInput: true
	}
};

/**
 * @param { import("@disqada/halfbot").BotCommandInteraction } interaction
 * @returns { Promise<import("discord.js").InteractionReplyOptions | string | void> }
 */
async function execute(interaction) {
	const { client } = interaction;

	/** @type { import("discord.js").APIEmbed } */
	const embed = {
		description: "بوت مجتمع محرك جودوت العربي الرسمي",
		thumbnail: { url: interaction.client.user.displayAvatarURL() },
		fields: [
			{
				name: "المطورين",
				value: "The Alpha - Risker"
			},
			{
				name: "لغة البرمجة",
				value: "JavaScript / TypeScript"
			},
			{
				name: "جميع الأوامر",
				value: "قم بتشغيل الأمر '/commands'"
			},
			{
				name: "السرعة",
				value: `${client.ws.ping}ms`
			}
		]
	};

	return {
		embeds: [embed]
	};
}

module.exports = new BotCommand(data, execute);
