const { BotCommand, BotCommandDeployment } = require("@disqada/halfbot");

/** @type { import("@disqada/halfbot").BotCommandData } */
const data = {
	name: "commands",
	description: "قائمة أوامر البوت",
	deployment: BotCommandDeployment.Global,
	category: "معلومات",
	types: { chatInput: true }
};

/**
 * @param { import("@disqada/halfbot").BotCommandInteraction } interaction
 * @returns { Promise<import("discord.js").InteractionReplyOptions | string | void> }
 */
async function execute(interaction) {
	const categories = {};

	for (const command of interaction.bot.commands) {
		const { data } = command[1];

		if (!categories[data.category]) {
			categories[data.category] = [];
		}

		categories[data.category]?.push({
			name: data.name,
			value: data.description,
			inline: true
		});
	}

	console.log("categories: ", categories);

	const embeds = [];

	for (const category in categories) {
		/** @type { import("discord.js").APIEmbed } */
		const embed = {
			title: category,
			fields: categories[category]
		};

		embeds.push(embed);
	}

	console.log("embeds: ", embeds);

	if (embeds.length === 0) {
		return "لا توجد أية أوامر";
	}

	return { embeds: embeds };
}

module.exports = new BotCommand(data, execute);
