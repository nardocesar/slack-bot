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
    const msg = message.toLowerCase();

    if(msg.includes('top 10')){
        services.getTop10Gyms()
            .then(data => {
                const message = formatter.topGymsFormatter(data.gyms);
                console.log(message);
                postBlockMessage(message);
                
            });
        return;
    }

    if(msg.includes('daily books')){
        services.getBooking()
            .then(data => {
                const message = formatter.bookingFormatter(data.gyms);
                postBlockMessage(message);
            });
        return;
    }

    if(msg.includes('book')){
        const gymName = msg.replace('book ', '');
        services.getGymInfo()
            .then(data => {
                const gymToBook = data.gyms.filter(gym => gym.name.toLowerCase() === gymName);
                const message = formatter.gymInfoFormatter(gymToBook);
                postBlockMessage(message);
            });
        return;
    }
};
