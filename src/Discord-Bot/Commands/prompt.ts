import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'

import { promptfull } from "../../Core/index"

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prompt')
    .setDescription('Talk to me.')
    .addStringOption((option) => option.setName('prompt').setDescription('the actual info').setRequired(true)),
  async execute(interaction: ChatInputCommandInteraction) {
    const prompt = interaction.options.getString('prompt')!
    const context: { [key: string]: any } = {};
    promptfull(prompt,context).then(async (respone) =>{
      await interaction.reply(respone)
    })
  }
}
