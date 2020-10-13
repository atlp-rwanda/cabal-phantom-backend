import Joi from 'joi';

exports.roleValidate = (req, res, next) => {
    const roleValidation = Joi.object({
        email: Joi.string().required().email(),
        role: Joi.string().required().valid('normal','driver', 'operator', 'admin').trim()
    });
    const result = roleValidation.validate(req.body);
    // if (result.error) return res.status(400).json({ message: result.error.details[0].message });

    if (result.error) {

        let message, errorMessage = result.error.details[0].message
        if (errorMessage == "\"email\" must be a valid email") {
            message = res.__("email is not valid")
        } else if (errorMessage == "\"role\" is required") {
            message = res.__("role is required")
        } else if (errorMessage == "\"role\" must be one of [normal, driver, operator, admin]") {
            message = res.__("role must be one of [normal, driver, operator, admin]")
        } else if (errorMessage == "\"email\" is required") {
            message = res.__("email is required")
        }

        return res.status(400).json({ message });
    }
    next();
}
