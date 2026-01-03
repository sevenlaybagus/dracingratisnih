import User from "#models/user";
import commands from "../datas/commands.js";
import { TelegramMessage } from "../types/telegram.js";

export async function startCommand(user: User, message: TelegramMessage, sendMessage: (chatId: string, data: any) => Promise<unknown>) {
    const menus: string[] = [];

    let index = 1
    for (const command of commands) {
        menus.push(`${index}. ${command.menu}\n${command.command} - ${command.description}`)
        index++
    }

    await sendMessage(message.chat.id, {
        text: `Halo ${user.name}, selamat datang di @dracingratisnih!\nSilahkan pilih menu di bawah ini:\n\n${menus.join('\n')}`,
    })
}