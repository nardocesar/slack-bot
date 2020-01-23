const topGymsFormatter = (list) => list.map(topGymsProcessor);

const bookingFormatter = (list) => list.map(bookingProcessor);

const topGymsProcessor = (gym) => ({
    type: 'section',
    text: {
        type: 'mrkdwn',
        text: `<${gym.url}|${gym.title}> Total: ${gym.total}`
    }
})

const bookingProcessor = (gym) => ({
    type: 'section',
    text: {
        type: 'mrkdwn',
        text: gym.classes.reduce((acc, { name, schedule, total }) => acc +=
            `\n * ${name}*\n Horário: ${schedule}\n Slots: ${total}`,
            `<${gym.url}|${gym.title}>`)
    }
})

module.exports = {
    topGymsFormatter,
    bookingFormatter
}