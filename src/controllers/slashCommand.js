import express from 'express'

const router = new express.Router()

router.post('/slash', async function (req, res) {
    console.log(req)
})

export default router
