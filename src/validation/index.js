import logInChecker from './logInValidation'
import resetPassword from './resetPasswordValidation'
import sendEmailChecker from './sendEmailValidation'
import roleValidate from './roleValidation'
import userValidate from './userValidation'
//import emailValidate from './emailValidate'
const validators = {logInChecker,resetPassword,sendEmailChecker,roleValidate,userValidate}

export default validators
