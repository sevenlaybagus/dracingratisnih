import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import { TelegramMessage, TelegramMessageChat, TelegramMessageFrom } from '../types/telegram.js'
import { TelegramService } from '#services/telegram_service'

export default class TelegramWebhooksController {
    private telegramBotToken: string = env.get('TELEGRAM_BOT_TOKEN')

    async index({ request, response }: HttpContext) {
        try {
            const apiSecretToken = request.header('x-telegram-bot-api-secret-token', '')
            if (apiSecretToken !== this.telegramBotToken)
                return response.unauthorized('Invalid API secret token')
            const body = request.body()
            const message: TelegramMessage | null = body.message || null

            if (!message)
                return response.badRequest('Invalid request')

            const from: TelegramMessageFrom = message.from
            const chat: TelegramMessageChat = message.chat

            if (!from.username || !chat.id || !message.text)
                return response.badRequest('Invalid request')

            const telegram = new TelegramService(chat.id, this.telegramBotToken)
            const handleMessage = await telegram.handleMessage(message)
            if (!handleMessage)
                return response.abort('Failed to handle webhook')

            return response.ok('Success to handle webhook')
        } catch (error) {
            return response.badRequest(error)
        }
    }
}