import { User } from 'discord.js'
import { client } from '../..'

const fetchUserInfo = async (userId: string): Promise<User> => {
  const user = await client.users.fetch(userId)
  return user
}
