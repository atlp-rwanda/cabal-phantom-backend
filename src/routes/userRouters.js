import express from "express";
const router =express()
import logIn from '../contollers/userSignIn';
router.post('/login',logIn)
export default router;
