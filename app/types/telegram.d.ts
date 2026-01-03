export interface TelegramMessageFrom {
    id: string
    is_bot: boolean
    first_name: string
    last_name: string
    username: string
    language_code: string
}

export interface TelegramMessageChat {
    id: string
    type: string
    username: string
}

export interface TelegramMessage {
    from: TelegramMessageFrom
    chat: TelegramMessageChat
    date: number
    text: string
}