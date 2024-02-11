const asyncHandler = require("express-async-handler");
const jwt = require("../utils/jwt");
const { errorUtil } = require("../utils/tools");
const { authErrors } = require("../config/errorCodes");

const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = jwt.getTokenFromReq(req);
    let errorMessage = "Access denied. No token provided.";
    if (token) {
        await jwt
            .verifyToken(token)
            .then((data) => {
                req.payload = data.payload;
                req.newToken = data.newToken;
                errorMessage = null;
                next();
            })
            .catch((err) => {
                errorMessage = err.message;
            });
    }
    if (errorMessage) {
        let errorConfig;
        if (errorMessage === "jwt expired")
            errorConfig = authErrors.midlleware.token.expired;
        else errorConfig = authErrors.midlleware.token.other;
        throw errorUtil.generateError({
            ...errorConfig,
            message: errorMessage,
        });
    }
});

const verifyOneRole = (...allowedRoles) => {
    return asyncHandler((req, res, next) => {
        const userRoles = req.payload.roles;
        const isAllowed = userRoles
            .map((role) => allowedRoles.includes(role))
            .find((val) => val === true);
        if (!isAllowed) {
            throw errorUtil.generateError(authErrors.midlleware.roles.oneRole);
        }
        next();
    });
};

const verifyRole = (allowedRoles) => {
    return asyncHandler((req, res, next) => {
        const userRole = req.payload.role;
        if (!allowedRoles.includes(userRole)) {
            throw errorUtil.generateError(authErrors.midlleware.roles.oneRole);
        }
        next();
    });
};

const verifyAllRoles = (...allowedRoles) => {
    return asyncHandler((req, res, next) => {
        const userRoles = req.payload.roles;
        const isDenied = allowedRoles
            .map((role) => !userRoles.includes(role))
            .find((val) => val === true);
        if (isDenied) {
            throw errorUtil.generateError(authErrors.midlleware.roles.allRoles);
        }
        next();
    });
};

module.exports = { verifyJWT, verifyOneRole, verifyAllRoles, verifyRole};
