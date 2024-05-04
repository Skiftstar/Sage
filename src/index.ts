import { readdirSync } from 'fs'
import {
  ChannelType,
  Collection,
  GatewayIntentBits,
  Partials
} from 'discord.js'
import { BotClient } from './Discord-Bot/DiscordBot/botClient'
import { REST, Routes } from 'discord.js'
import { sendError, startBot } from './Discord-Bot/DiscordBot/bot'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

export const client = new BotClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
})

const commandFolder = path.join(__dirname, 'Commands')
const commandFiles = readdirSync(commandFolder)
client.commands = new Collection()
const commands: any[] = []

for (const file of commandFiles) {
  const command = require(`./Commands/${file}`)
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
    commands.push(command.data.toJSON())
  }
}

const token = process.env.DISCORD_BOT_TOKEN!
const clientId = process.env.DISCORD_BOT_CLIENT_ID!

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token)

// and deploy your commands!
;(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: commands
    })

    console.log(
      `Successfully reloaded ${(data as any).length} application (/) commands.`
    )
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
})()

startBot()

client.on('ready', () => {
  console.log('Bot started!')
})

client.on('messageCreate', (message) => {
  console.log(message)
  if (message.author.bot) return
  if (!(message.channel.type === ChannelType.DM)) return

  if (!isWhitelisted(message.author.id)) {
    message.reply("You're not allowed to use this command.")
    return
  }

  if (message.attachments.size === 0) return

  const attachment = message.attachments.first()
  if (!attachment) return

  if (!attachment.contentType?.startsWith('audio/')) return

  const url = attachment.url
  
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const command = (interaction.client as BotClient).commands.get(
    interaction.commandName
  )

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  if (!isWhitelisted(interaction.user.id)) {
    await interaction.reply("You're not allowed to use this command.")
    return
  }

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true
      })
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true
      })
    }
  }
})

client.on('error', (error) => {
  sendError(error.name, error.message)
})

const isWhitelisted = (userId: string) => {
  return userId === '242358261867741185' || userId === '230619260517482498'
}
