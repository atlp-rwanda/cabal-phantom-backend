import express from "express";
const router =express()
import logIn from '../contollers/userSignIn';
router.post('/login',logIn)

import * as userControl from "../contollers/userControl";

router.get('/',(req,res)=>{
    userControl.getAllUsers()
    .then(users=>res.json(users))
});

router.post("/", userControl.createUser)
router.get('/:userId', userControl.getUserById);
router.put('/:userId', userControl.updateUser);
router.delete('/:userId', userControl.deleteUser);

export default router;

