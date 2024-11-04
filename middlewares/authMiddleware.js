import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
	if(req.method === "OPTIONS") {
		return next();
	}
	
	try {
	const token = req.headers.authorization.split(' ')[1];
	if(!token) {
		return res.status(403).json({ message: "Юзер не авторизований!" });
	}
	const decodedData = jwt.verify(token, process.env.JWT_SECRET);
	req.user = decodedData;
	next();
	}catch (e) {
		console.log(e);
		return res.status(403).json({ message: "Юзер не авторизований!" });
	}
}

export default authMiddleware;