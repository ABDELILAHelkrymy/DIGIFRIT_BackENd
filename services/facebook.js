const path = require("path");
const logger = require(path.join(appRoot, "utils", "tools")).logger.log();

const getFbClient = (redirectUri) => {
    const clientId = process.env.FACEBOOK_CLIENT_ID;
    const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
    const authorizeUrl = process.env.FACEBOOK_URL_AUTHORIZE;
    const tokenUrl = process.env.FACEBOOK_URL_TOKEN;
    const userDataUrl = process.env.FACEBOOK_URL_USER_DATA;
    const logTitle = "Facebook Oauth Client";

    return {
        getAuthorizationUrl: () => {
            logger.log("getAuthorizationUrl clientId : " + clientId);
            return `${authorizeUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email`;
        },
        getAccessToken: async (code) => {
            const response = await fetch(
                `${tokenUrl}?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${code}`
            );
            const data = await response.json();
            logger.log(
                "getAccessToken data: " + JSON.stringify(data),
                logTitle
            );
            return data.access_token;
        },
        getUserData: async (accessToken) => {
            const response = await fetch(
                `${userDataUrl}?fields=id,name,email&access_token=${accessToken}`
            );
            const data = await response.json();
            logger.log("getUserData data: " + JSON.stringify(data), logTitle);
            return data;
        },
    };
};

exports.getFbClient = getFbClient;
