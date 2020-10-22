import Model from '../database/models'

exports.checkID = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const items = await Model.Bus.findAll()
    const IDs = items.map(item => item.id)
    if (!IDs.includes(id)) {
        res.status(404).json({
            message: res.__("bus doesn't exist")
        })
    }
    next()
}

exports.checkPlate = async (req, res, next) => {
    const findPlate = await Model.Bus.findOne({ where: { plate: req.body.plate } })
    if (findPlate) {
        res.status(409).json({
            message: res.__("Bus with") + " " + req.body.plate + " " + res.__("already exist")
        })
        return false
    }
    next()
}
