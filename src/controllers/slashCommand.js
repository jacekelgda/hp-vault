import express from 'express'
import { getUsersFromChannel } from '../handlers/slackApi'
import { getBotToken, storeHp } from '../handlers/store'

const router = new express.Router()

const FITQUEST_COMMAND = '/fitquest'
const FITQUEST_COMMAND_START_TEXT = 'start'
const FITQUEST_CHANNEL_ID = 'C5NGD3EA2'

router.post('/slash', async function (req, res) {
    if (req.body.command === FITQUEST_COMMAND && req.body.text === FITQUEST_COMMAND_START_TEXT) {
      const token = await getBotToken(req.body.team_id)
      const participants = await getUsersFromChannel(token, FITQUEST_CHANNEL_ID)
      const timestamp = new Date().getTime()
      for (let i = 0, len = participants.length; i < len; i++) {
        await storeHp(participants[i], req.body.team_id, timestamp)
      }
    }
    res.send('ok')
})

export default router
