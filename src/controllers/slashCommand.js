import express from 'express'
import { getUsersFromChannel } from '../handlers/slackApi'
import { getBotToken } from '../handlers/store'

const router = new express.Router()

const FITQUEST_COMMAND = '/fitquest-start'
const FITQUEST_COMMAND_START_TEXT = 'start'
const FITQUEST_CHANNEL_ID = 'C5NGD3EA2'

router.post('/slash', async function (req, res) {
    if (req.body.command === FITQUEST_COMMAND && req.body.text === FITQUEST_COMMAND_START_TEXT) {
      const token = await getBotToken(req.body.team_id)
      console.log(token)
      const participants = await getUsersFromChannel(token, FITQUEST_CHANNEL_ID)
      console.log(participants)
    }
    res.send('ok')
})

export default router
