import Model from '../database/models'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signinToken, decode } from '../utils/jwt';
import emails from '../utils/sendEmail';
import pwd from "../utils/generatePassword";
import bcrypts from "bcrypt";
import defaultRole from '../utils/generateDefaultRole';
import messages from '../utils/messageMocks'

class userController {
    static async getAllUsers(req, res) {
        const users = await Model.User.findAll()
        res.status(200).json({
            users
        })
    }

    static async logIn(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: res.__("emptyPassORemail")
            })
        }

        const user = await Model.User.findOne({
            where: {
                email
            }
        })

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({
                message: res.__('passOemailInvalid'),
            });
        }
        const token = signinToken(
            { id: user.id }
        );

        res.status(201).json({
            status: res.__('ok'),
            message: res.__("loginSuccess"),
            Token: token
        });
    }

    static async updateUser(req, res) {
        try {
            const updated = await Model.User.update({ role: req.body.role },
                { where: { email: req.body.email } }
            );

            if (updated) {
                const userExist = await Model.User.findOne({ where: { email: req.body.email } });
                return res.status(200).json({ user: userExist });
            }
        } catch (error) {
            return res.status(500).json({ message: error })
        }
    }

    static async createUser(req,res){
        try {
            const generatedPassword = pwd.generatePassword()
            const hashed = await bcrypts.hash(generatedPassword,12) 
            const role= await defaultRole.generateDefault()   
            const theUser = {
              name: req.body.name,
              email:req.body.email,
              password:hashed,
              role:role,
              birthdate: req.body.birthdate,
              gender: req.body.gender
              };
      
              const email  = req.body.email;
              
            const doesExist = await Model.User.findOne({
                where: {email}
            });
              if(doesExist){
                res.status(409).json({
                  message:res.__('User with the provided email is already registered.')
                })
                return false
              }
              const user = await Model.User.create(theUser); 
              const options ={
                  userEmail:`${email}`,
                  subject: 'Phantom Registration Successful',
                  message:messages.signupEmail(email,generatedPassword)

              }
            emails.sendEmail(options)     
            return res.status(201).json({
              user
            });
        } 
        catch (error) {
            return res.status(500).json({message:"Unable to register user"})
        }
    }
    static async forgetPassword(req, res) {
        try {
            const {email} = req.body;        
        const user = await Model.User.findOne({  
            where:{
            email
            }
        });
        if (!user) {
          res.status(404).json({
            message: res.__('email is not registered'),
          });
        } 
        else {
            const token = jwt.sign({email},process.env.secretKey || "publicTokenKey",{ expiresIn: 60 * 10})
            const url = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${token}` 
           
            const mailOptions ={
                  userEmail:`${email}`,
                  subject: 'Phantom Reset password link',
                  message:messages.resetLink(`${url}`)

              }
           emails.sendEmail(mailOptions)
          return res.status(200).json({
                message: res.__('Check in your email a link for changing password'),
            })  
        }
     } catch (error) {
         return  res.status(500).json({ 
                    error: res.__('error sending email')
                 });
        }
    }
    
    static async resetPassword(req,res) {

      try {
         const { password, confirmPassword } = req.body
        
        const url  = req.params;
        console.log('url=',url)
        const token = url.token
        console.log('token=',token)
        const payload = decode(token);

        
        console.log('payload=',payload)
        const email  = payload.email;
        console.log("email=",email)

        const  registered = await Model.User.findOne({
                where: { email } 
        });
		if (!registered) {
			return res.status(404).json({
					status: 404,
					error: res.__('onVerifyFailure')
				});
			}
		if (password !== confirmPassword) {
			return res.status(422).json({
					status: 422,
					error: res.__('passwordsDontMatch')
				});
			}
			const hash = await bcrypt.hash(password, 12);

			await Model.User.update({ password: hash }, { where: { email } }).then(res.status(200).json({
				status: 200,
				message: res.__('passwordReset')
			}))
      } catch (error) {
          res.status(500).json({
				status: 500,
				error: res.__('Invalid link')
          
            })

        }
   }
}

export default userController
