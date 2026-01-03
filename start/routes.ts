/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const TelegramWebhookController = () => import('#controllers/telegram_webhooks_controller')

router.any('/telegram/webhook', [TelegramWebhookController, 'index'])
