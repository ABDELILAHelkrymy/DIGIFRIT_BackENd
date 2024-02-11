const getBaseUrl = (req) => {
    const protocol = req.protocol;
    const hostname = req.hostname;
    // const port = req.port;
    return `${protocol}://${hostname}`;
};

const getGoogleRedirectUrl = (req) => {
    const baseUrl = getBaseUrl(req);
    return baseUrl + "/auth/v1/google/callback";
};

const getFacebookRedirectUrl = (req) => {
    const baseUrl = getBaseUrl(req);
    return baseUrl + "/auth/v1/facebook/callback";
};

exports = { getBaseUrl, getGoogleRedirectUrl, getFacebookRedirectUrl };
