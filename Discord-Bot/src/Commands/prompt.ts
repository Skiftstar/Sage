import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prompt')
    .setDescription('Talk to me.'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply('Test...')
  }
}
