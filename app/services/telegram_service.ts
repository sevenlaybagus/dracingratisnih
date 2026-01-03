import User from "#models/user"
import { startCommand } from "../commands/start.js"
import commands from "../datas/commands.js"
import { TelegramMessage } from "../types/telegram.js"

export class TelegramService {
  botToken: string
  chatId: string

  constructor(botToken: string, chatId: string) {
    this.botToken = botToken
    this.chatId = chatId
  }

  async sendMessage(chatId: string, data: any) {
    const response = await fetch(`https://api.telegram.org/bot${this.botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        ...data,
      }),
    })

    return response.json()
  }

  private async handleCommand(user: User, message: TelegramMessage) {
    const command = message.text.split(' ')[0]

    if (commands.find((cmd) => cmd.command == command)) {
      if (command == '/start')
        return await startCommand(user, message, this.sendMessage)
    }

    return null
  }

  async handleMessage(message: TelegramMessage) {
    const user = await User.find(message.chat.id)
    if (!user)
      await User.create({
        name: `${message.from.first_name} ${message.from.last_name}`,
        username: message.from.username,
        telegram_chat_id: message.chat.id,
      })

    const isCommand = message.text.startsWith('/')
    if (isCommand)
      return await this.handleCommand(user!, message)

    return null
  }
}