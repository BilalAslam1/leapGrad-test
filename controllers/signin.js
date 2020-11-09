var mysql = require('mysql');

const jwt = require('jsonwebtoken');
const register = require('./register');

const handleSignin = (req, con, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return Promise.reject('incorrect form submission');
    }
    if (!register.validateEmail(email)) {
        return Promise.reject('Not a valid email address');
    }

    var sql_email = mysql.format("SELECT * FROM users WHERE email = ?");

    // con.query() does not return a promise by default 
    return new Promise(function (resolve, reject) {
        con.query(sql_email, [email], function (err, result) {
            if (err) throw err;

            if (result.length == 0) {
                return reject('Wrong credentials');
            }
            else {
                var user = result[0];
                console.log(result)
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        return resolve(user);
                    }
                    else
                        return reject('wrong credentials');
                });
            }
        });
    })
}

const signInAuthentication = (req, res, con, bcrypt) => {
    const { authorization } = req.headers;
    return authorization ? getAuthTokenID(req, res) :
        handleSignin(req, con, bcrypt)
            .then(user =>
                user.id && user.email ? createSession(user) : Promise.reject("User is not valid"))
            .then(session => res.status(200).json(session))
            .catch(err => res.status(400).json(err));
}

const getAuthTokenID = (req, res) => {
    // authenticate user by storing session tokens or other means and comparing against them 
    console.log("auth is good");
}

const createSession = (user) => {
    const { email, id } = user;
    const token = signToken(email);
    return { success: 'true', user_id: id, token, user };
};

// Don't want to use sensitive info to sign token 
const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '3 days' });
};


module.exports = {
    signInAuthentication: signInAuthentication,
    handleSignin: handleSignin
}