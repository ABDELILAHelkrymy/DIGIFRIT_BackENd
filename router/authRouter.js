const { Router } = require("express");
const router = Router();
const path = require("path");
const authMiddleware = require(
    path.join(appRoot, "middlewares", "authMiddleware")
);
const userController = require(
    path.join(appRoot, "controllers", "auth", "userController")
);
const googleController = require(
    path.join(appRoot, "controllers", "auth", "googleController")
);
const facebookController = require(
    path.join(appRoot, "controllers", "auth", "facebookController")
);

router
    .route("/v1/user/update-with-provider")
    .post(authMiddleware.verifyJWT, userController.updateWithProvider);
router
    .route("/v1/user/get-with-provider")
    .post(authMiddleware.verifyJWT, userController.getWithProvider);

router.route("/v1/google/authorize").post(googleController.authorize);
router.route("/v1/google/callback").post(googleController.callback);

router.route("/v1/facebook/authorize").post(facebookController.authorize);
router.route("/v1/facebook/callback").post(facebookController.callback);

module.exports = router;
