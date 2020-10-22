import Model from '../database/models'
import helperFunction from '../utils/generateDefaultRole'
import { paginate } from 'paginate-info'

class busController {
    static async createNewBus(req, res) {
        try {
            const { plate, company, seats, status } = req.body
            const category = helperFunction.classifyBus(req.body.seats)

            const bus = await Model.Bus.create({
                plate, company, seats, status, category
            });
            return res.status(201).json({
                bus
            });
        } catch (error) {
            return res.status(500).json({
                message: res.__("can't add new bus")
            })
        }
    }

    static async getAllBus(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query
            const offset = (page - 1) * limit
            const { rows, count } = await Model.Bus.findAndCountAll({
                page, limit, offset
            });
            const pagination = paginate(page, count, rows, limit);

            if (offset >= count) {
                res.status(404).json({
                    message: res.__("page not found")
                })
            }
            return res.status(200).json({
                pagination,
                rows
            })
        } catch (error) {
            res.status(500).json({
                message: res.__("can't get buses")
            })
        }
    }

    static async getBus(req, res) {
        try {
            const bus = await Model.Bus.findAll({ where: { id: req.params.id } })
            res.status(200).json({ bus })
        } catch (error) {
            res.status(500).json({
                message: res.__("Bus with") + ` id = ${req.params.id} ` + res.__("not found")
            })
        }
    }

    static async updateBus(req, res) {
        try {
            const { company, seats, status } = req.body
            const category = helperFunction.classifyBus(req.body.seats)
            
            const updated = await Model.Bus.update(
                {company, seats, status, category},
                {
                    where: { id: req.params.id }
                })

            if (updated) {
                const updatedBus = await Model.Bus.findByPk(req.params.id)
                res.status(200).json({
                    updatedBus
                })
            }
        } catch (error) {
            res.status(500).json({
                message: res.__("can't update bus")
            })
        }
    }

    static async deleteBus(req, res) {
        await Model.Bus.destroy({ where: { id: req.params.id } })
        res.status(200).json({
            message: res.__("Deleted successfully")
        })
    }
}

export default busController
