import jwt from "jsonwebtoken";

const roleMiddleware = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            return next();
        }

        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: "Юзер не авторизований!" });
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userRoles = decodedToken.roles;

            // Проверяем, если роли — массив
            if (!Array.isArray(userRoles)) {
                return res.status(403).json({ message: "У вас не має доступа!" });
            }

            // Проверка на совпадение роли
            const hasRole = userRoles.some(userRole => roles.includes(userRole));
            if (!hasRole) {
                return res.status(403).json({ message: "У вас не має доступа!" });
            }

            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({ message: "Юзер не авторизований!" });
        }
    };
};

export default roleMiddleware;
