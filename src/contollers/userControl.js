import Model from "../database/models"
import pwd from "../utils/generatePassword"
import emails from "../utils/email.js"
import bcrypt from "bcrypt";
import validatorFile from "../validations/registerValid"


exports.getAllUsers= ()=>{
    const userPromise = new Promise((resolve)=>{
        resolve(Model.User.findAll({}))
    })
    return userPromise
}

exports.createUser = async (req, res) => {
    try {
      const generatedPassword = pwd.generatePassword()
      const hashed = await bcrypt.hash(generatedPassword,12)     
      const theUser = {
        name: req.body.name,
        email:req.body.email,
        password:hashed,
        role: req.body.role,
        birthdate: req.body.birthdate,
        gender: req.body.gender
        };

        await validatorFile.registerValidation(req.body)
        const userEmail  = req.body.email;
        
      const doesExist = await Model.User.findOne({
          where: {email:userEmail}
      });
        if(doesExist){
          res.status(200).json({
            message:"User with the provided email is already registered."
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
      console.log(error)
      return res.status(500).json({error: error.message})
    }
  }
  


exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Model.User.findOne({
      where: { id: userId }
      
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send('User with the specified ID does not exists');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const [ updated ] = await Model.User.update(req.body, {
      where: { id: userId }
    });
    if (updated) {
      const updatedUser = await Model.User.findOne({ where: { id: userId } });
      return res.status(200).json({ user: updatedUser })
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = await Model.User.destroy({
      where: { id: userId }
    });
    if (deleted) {
      return res.send("User deleted");
    }else{res.send("User not found")}
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
