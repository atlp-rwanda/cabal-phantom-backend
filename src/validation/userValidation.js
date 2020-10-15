import Joi from 'joi';
exports.userValidate = (req, res, next) => {
    const userValiation = Joi.object({
        name: Joi.string()
            .required()
            .min(4)
            .error(errors => {
                errors.forEach(err => {
                    switch (err.code) {
                        case "any.required":
                            err.message = res.__('name is required')
                            break;
                        case "string.empty":
                            err.message = res.__('Name must not be empty')
                            break
                        case "string.min":
                            err.message = res.__('Name must be atleast four characters')
                            break
                    }
                })
                return errors
            }),
        email: Joi.string().required().email().error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.email":
                        err.message = res.__("provide valid email")
                        break
                    case "any.required":
                        err.message = res.__('email is required')
                        break
                    case "string.empty":
                        err.message = res.__('Email must not be empty')
                        break
                }
            })
            return errors
        }),
        gender: Joi.string().max(8).required().error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "string.max":
                        err.message = res.__("gender should be not more 8 characters")
                        break
                    case "any.required":
                        err.message = res.__('gender is required')
                        break
                    case "string.empty":
                        err.message = res.__('gender must not be empty characters')
                        break

                }
            })
            return errors
        }),
        birthdate: Joi.date().required().error(errors => {
            errors.forEach(err => {
                switch (err.code) {
                    case "any.required":
                        err.message = res.__('birthdate is required')
                        break
                    case "date.base":
                        err.message = res.__('date of birth should be in a format yyyy-mm-dd')
                        break
                    }
            })
            return errors
        })
    });
    const result = userValiation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}
