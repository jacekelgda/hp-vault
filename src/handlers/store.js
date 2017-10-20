import firebase from 'firebase'
import * as apiHandler from './slackApi'
require('dotenv').config()

const TOKENS_REF = 'tokens'

const config = {
    apiKey: process.env.firebase_config_apikey,
    authDomain: process.env.firebase_config_authdomain,
    databaseURL: process.env.firebase_config_databaseurl,
    storageBucket: process.env.firebase_config_storagebucket,
    messagingSenderId: process.env.firebase_config_messagingsenderid,
    projectId: process.env.firebase_config_projectid
}

const init = () => {
    firebase.initializeApp(config)
    return firebase.auth().signInAnonymously()
}

const storeTeamToken = (token) => {
    const botData = { botToken: token.bot.bot_access_token, botUserId: token.bot.bot_user_id }
    const data = { teamId: token.team_id, bot: botData, token: token.access_token }
    const ref = `${TOKENS_REF}/${token.team_id}`

    firebase.database().ref(ref).set(data)
}

const setupDevTeam = async () => {
    const devBotData = await apiHandler.identifyDevBotData()
    const botData = { bot_access_token: process.env.slack_bot_token, bot_user_id: devBotData.user_id }
    const tokenData = { bot: botData, team_id: devBotData.team_id, access_token: process.env.slack_api_token }

    storeTeamToken(tokenData)
}

const getAllTokens = () =>
    firebase.database().ref(TOKENS_REF).once('value')
      .then(snapshot => {
          const tokens = []
          const snaps = snapshot.val()
          for (let key in snaps) {
              if (snaps.hasOwnProperty(key)) {
                  tokens.push({ token: snaps[key].bot.botToken, team: key })
              }
          }

          return tokens
      })

const getTeamApiToken = (teamId) =>
    firebase.database().ref(`${TOKENS_REF}/${teamId}`).once('value').then(snap => snap.val().token)

const getBotToken = (teamId) =>
    firebase.database().ref(`${TOKENS_REF}/${teamId}`).once('value').then(snap => snap.val().bot.botToken)

export {
    storeTeamToken,
    setupDevTeam,
    init,
    getAllTokens,
    getTeamApiToken,
    getBotToken,
}
