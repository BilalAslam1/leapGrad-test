const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send('Unauthorized');
    }
    // compare JWT token with
    else {
        console.log("user is logged in");
        next();
    }
};

module.exports = {
    requireAuth
}