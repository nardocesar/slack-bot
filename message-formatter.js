const topGymsFormatter = (list) => list.map(topGymsProcessor);

const bookingFormatter = (list) => list.map(bookingProcessor);

const gymInfoFormatter = (list) => list.map(gymInfoProcessor);

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

const gymInfoProcessor = (gym) => ({
    type: 'section',
    text: {
        type: 'mrkdwn',
        text: `Quer agendar uma aula em ${gym.name}? - <${gym.url}|Agendar>`
    }
})

module.exports = {
    topGymsFormatter,
    bookingFormatter,
    gymInfoFormatter
}