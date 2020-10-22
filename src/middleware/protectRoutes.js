import jwt from 'jsonwebtoken'
import Model from '../database/models'

exports.protect = async (req, res, next) => {

    let token 
    if (req.headers.authorization) {
        token = req.headers.authorization
    }
    console.log(token)
    if (!token) {
        return next(
            res.status(401).json({
                message: res.__('log in to get access')
            })
        )

    }

    try {
        const decoded = await jwt.verify(token, process.env.secretKey)

        const freshUser = await Model.User.findByPk(decoded.id)
        req.user = freshUser

    } catch (error) {
        return next(
            res.status(403).json({
                message: res.__('login again')
            })
        )
    }
    next()
}

//restrict to ...
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                res.status(403).json({
                    message: res.__('permission for this action')
                })
            )
        }
        next()
    }
}
