import Model from '../database/models'
import bcrypt from 'bcryptjs';
import { signinToken } from '../utils/jwt';
import pwd from "../utils/generatePassword"
import emails from "../utils/email.js"
import bcrypts from "bcrypt";
import defaultRole from '../utils/generateDefaultRole'


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
      
              const userEmail  = req.body.email;
              
            const doesExist = await Model.User.findOne({
                where: {email:userEmail}
            });
              if(doesExist){
                res.status(409).json({
                  message:res.__('User with the provided email is already registered.')
                })
                return false
              }
              const user = await Model.User.create(theUser); 
              const Options ={
                email:req.body.email,
                password:generatedPassword,
              }
              emails.sendEmail(Options)     
            return res.status(201).json({
              user
            });
          } catch (error) {
            return res.status(500).json({message:"Unable to register user"})
          }
    }
}

export default userController
