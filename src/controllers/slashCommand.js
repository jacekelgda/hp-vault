import express from 'express'

const router = new express.Router()

router.post('/slash', async function (req, res) {
    console.log(req.body.text)
    console.log(req.body.user_id)
    console.log(req.body.user_name)
    res.send('ok')
})

export default router
