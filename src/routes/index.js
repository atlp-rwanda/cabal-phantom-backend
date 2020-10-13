import express from 'express'
import userRoute from '../routes/userRouters'

const router = express()

router.get('/', (req, res) => {
    res.status(200).json({
        message: res.__('welcome')
    })
})

router.use('/api/v1/auth', userRoute)

router.all('*', (req, res) => {
    res.status(404).json({
        message: res.__("404")
    })
})

export default router
