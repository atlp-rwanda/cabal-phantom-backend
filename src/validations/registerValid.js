import Joi from "@hapi/joi" ;

 const registerValidation = (req,res) => {

const schema = Joi.object({
    name : Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email(),
    role: Joi.any().valid("driver", "operator", "admin").error(err=>{ return err}),
    birthdate: Joi.string().min(4).required(),
    gender: Joi.any().valid("male", "female").error(err=>{ return err})
})

return schema.validateAsync(req);

}

export default {registerValidation} 