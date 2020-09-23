"use strict"
import Modal from '../database/models';
import bcrypt from 'bcrypt';
import { signinToken } from './../utils/jwt';
const logIn = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(400).send({
          message:res.__( "emptyPassORemail")
      })
    }
    const user = await Modal.User.findOne({  
        where:{
        email
        }
    });
    if(!user || !bcrypt.compareSync(password,user.password)){
        return res.status(401).send({
            message:res.__('passOemailInvalid'),
        });
    }
    const token = signinToken(
        { email:email,role:user.role}
    );
    res.status(201).json({
        status:res.__('ok'),
        message:res.__("loginSuccess"),
        Token:token
    });
}
export default logIn;
