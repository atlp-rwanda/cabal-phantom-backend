import Joi from 'joi';

const displayMessage = (res) => {
    return {
        "number.base": res.__('seats should be a number'),
        "number.integer": res.__('seats should be integer number'),
        "number.min": res.__('seats should be greater than or equal to 18')
    }
}

exports.busValidate = (req, res, next) => {
    const busValidation = Joi.object({

        plate: Joi.string().min(7).required().messages({
            "any.required": res.__('plate should be required'),
            "string.min": res.__('plate should be at least 7 character'),
            "string.empty": res.__('plate should not be empty')
        }),

        company: Joi.string().required().messages({
            "any.required": res.__('company should be required'),
            "string.empty": res.__('company should not be empty')
        }),

        seats: Joi.number().integer().min(18).required().messages({
            "any.required": res.__('seats should be required'),
        }, displayMessage(res)),

        status: Joi.string().valid('active', 'inactive').required().messages({
            "any.required": res.__('status should be required'),
            "any.only": res.__("status should be [active, inactive]")
        })

    });
    const result = busValidation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}

exports.updateBusValidate = (req, res, next) => {
    const updateBusValidation = Joi.object({

        company: Joi.string().messages({
            "string.empty": res.__('company should not be empty')
        }),

        seats: Joi.number().integer().min(18).messages(displayMessage(res)),

        status: Joi.string().valid('active', 'inactive').messages({
            "any.only": res.__("status should be [active, inactive]")
        })

    });
    const results = updateBusValidation.validate(req.body);
    if (results.error) return res.status(400).json({ message: results.error.details[0].message });
    next();
}

