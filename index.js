require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { offerOptions, addressOptions } = require('./options');

const TOKEN = process.env.TELEGRAM_TOKEN;

const options = { webHook: { port: process.env.PORT } };

const url = process.env.APP_URL;
const bot = new TelegramBot(TOKEN, options);

const groupId = process.env.GROUP_ID;

bot.setWebHook(`${url}/bot${TOKEN}`);

bot.setMyCommands([
	{ command: '/start', description: 'Начальное приветствие' },
	{ command: '/help', description: 'Помощь' },
]);

bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Приветствие');
});

bot.onText(/\/help/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(
		chatId,
		'Для того чтобы отправить предложение введите /offer и текст предложения. Например: "/offer какой-то текст"',
	);
});

bot.onText(/\/offer (.+)/, (msg, match) => {
	const chatId = msg.chat.id;
	const response = match[1];
	bot.sendMessage(groupId, response, offerOptions);
});

bot.on('callback_query', (msg) => {
	const data = msg.data;
	// const chatId = msg.message.chat.id;
	const offerMessage = msg.message.message_id;

	if (data === '/refuse') {
		bot.deleteMessage(groupId, offerMessage);
		bot.sendMessage(groupId, 'Очень жаль');
	}
	if (data === '/accept') {
		bot.deleteMessage(groupId, offerMessage);
		bot.sendMessage(
			groupId,
			'Отлично. Вам нужно прибыть по адресу: г. Ставрополь, ул. Ленина, д. 460',
			addressOptions,
		);
	}
});
