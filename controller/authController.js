import AuthUsers from '../model/auth_models/auth-users.js';
import AuthRole from '../model/auth_models/auth_role.js';
import bcrypt from 'bcryptjs';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken';
import user from "../model/user.js";

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles
	}
	return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1d"});
	
}

class AuthController {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return res.status(400).json({message: "Помилка при реєстрації", errors});
			}
			const {username, password} = req.body;
			const candidate = await AuthUsers.findOne({username});
			if (candidate) {
				return res.status(400).json({message: "Юзер з таким іменем вже є!"})
			}
			const hashPassword = await bcrypt.hashSync(password, 7);
			const userRole = await AuthRole.findOne({value: "USER"})
			const user = new AuthUsers({username, password: hashPassword, roles: [userRole.value]});
			await user.save();
			return res.json({ message: "Юзер був успішно зареєстрований" });
		} catch (e) {
			console.error(e);
			res.status(400).json({message: "Registration error"})
		}
	}

	async login(req, res) {
		try {
			const {username, password} = req.body;
			const foundUser = await AuthUsers.findOne({username});
			if (!foundUser) {
				return res.status(400).json({message: `Юзер ${username} не знайдений`})
			}
			const validPassword = await bcrypt.compareSync(password, foundUser.password);
			if(!validPassword) {
				return res.status(400).json({message: "Уведений не вірний пароль"})
			}
			const token = generateAccessToken(foundUser._id, foundUser.roles);
			return res.json({token});
		} catch (e) {
			console.error(e);
			res.status(400).json({ error: "Login failed!" });
		}
	}

	async getUsers(req, res) {
		try {
			const users = await AuthUsers.find();
			return res.json(users);
		} catch (e) {
			console.error(e);
			res.status(500).json({ error: "Failed to retrieve users!" });
		}
	}
}

export default AuthController;
