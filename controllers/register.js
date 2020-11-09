var mysql = require('mysql');
const handleRegister = (req, res, con, bcrypt) => {

    const { username, password, email } = req.body;

    if (!email || !username || !password) {
        return res.status(400).json('incorrect form submission');
    }
    if (!validateEmail(email)) {
        return res.status(400).json('Not a valid email address');
    }

    // Password strength check would be on front end
    // Make sure valid username

    var sql_check_users = mysql.format("SELECT * FROM users WHERE username = ?");
    var sql_check_emails = mysql.format("SELECT * FROM users WHERE email = ?");

    // Check if user with username already exists 
    con.query(sql_check_users, [username], function (err, result) {
        if (err) throw err;

        if (result.length != 0) {
            return res.status(400).json('A user with that username already exists');
        }
        else {
            // check if user with that email already exists 
            con.query(sql_check_emails, [email], function (err, result) {
                if (err) throw err;
                if (result.length != 0) {
                    return res.status(400).json('A user with that email already exists');
                }
                else {
                    // Register User 
                    const saltRounds = 10;
                    bcrypt.hash(password, saltRounds, function (err, hash) {
                        let current_datetime = new Date();
                        var sql_insert_user = mysql.format("INSERT INTO users (username, email, password) VALUES ('" + username + "','" + email + "','" + hash + "')");

                        con.query(sql_insert_user, function (err, result) {
                            if (err) {
                                return res.status(400).json('unable to register')
                            };
                            console.log(result);
                            return res.status(200).json('User registered');
                        });
                    });
                }
            });
        }
    });
}

function validateEmail(email) {
    // validates any anystring@anystring.anystring
    var reg = /\S+@\S+\.\S+/;
    return reg.test(email);
}

module.exports = {
    handleRegister: handleRegister,
    validateEmail: validateEmail
};