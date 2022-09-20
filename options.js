module.exports = {
	offerOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[
					{ text: '❌ Отказаться', callback_data: '/refuse' },
					{ text: '✅ Принять', callback_data: '/accept' },
				],
			],
		}),
	},

	addressOptions: {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[
					{
						text: '📍 Показать на карте',
						url: 'https://yandex.ru/maps/36/stavropol/house/ulitsa_lenina_460/YEgYfwVkSUAGQFpvfXxydHRmbQ==/?ll=41.924051%2C45.035859&z=17.16',
					},
				],
			],
		}),
	},
};
