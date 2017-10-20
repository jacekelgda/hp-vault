import Botkit from 'botkit'
import { getTeamUsers } from './slackApi'
require('dotenv').config()

let bots = []
let users = []

const listener = Botkit.slackbot({
    debug: false,
    stats_optout: false
})

const createNewBotConnection = (token) => {
    const bot = listener.spawn({ token: token.token }).startRTM()
    bots[token.team] = bot
    users[token.team] = getTeamUsers(token.token)
}

const resumeAllConnections = (tokens) => {
    for ( const key in tokens ) {
        createNewBotConnection(tokens[key])
    }
}

const hiBack = (bot, message) => {
    console.log('hi')
}

export {
    listener,
    createNewBotConnection,
    resumeAllConnections,
    hiBack
}
