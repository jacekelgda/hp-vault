import express from 'express'
import slashCommandController from './slashCommand'

const router = new express.Router()

router.use(slashCommandController)

export default router
