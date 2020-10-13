import Model from '../database/models'
import bcrypt from 'bcryptjs';
import { signinToken } from '../utils/jwt';

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
}

export default userController
