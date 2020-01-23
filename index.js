const SlackBot = require('slackbots'),
 services = require('./service'),
 formatter = require('./message-formatter'),
 dotenv = require('dotenv');

dotenv.config();

const bot = new SlackBot({
    token: process.env.SLACK_TOKEN,
    name: 'Alfred Legacy'
});

bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
});

const postBlockMessage = (blockMessage) => {
    bot.postMessageToChannel(
        process.env.CHANNEL_NAME,
        '',
        {
            blocks: blockMessage
        });
};

const handleMessage = (message) => {
    if(message.includes('top 10')){
        services.getTop10Gyms()
            .then(data => {
                const message = formatter.topGymsFormatter(data.gyms);
                postBlockMessage(message);
                
            });
        return;
    }

    if(message.includes('daily books')){
        services.getBooking()
            .then(data => {
                const message = formatter.bookingFormatter(data.gyms);
                postBlockMessage(message);
            });
        return;
    }
};
