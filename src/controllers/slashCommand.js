import express from 'express'

const router = new express.Router()

const FITQUEST_COMMAND = '/fitquest-start'
const FITQUEST_COMMAND_START_TEXT = 'start'

router.post('/slash', async function (req, res) {
    if (req.body.command === FITQUEST_COMMAND && req.body.text === FITQUEST_COMMAND_START_TEXT) {
      // fetch all users
    }
    res.send('ok')
})

export default router
