var mysql = require('mysql');
const sendMessage = async (req, res, con) => {

    const { message, user_id, to_id } = req.body;

    if (!message || !user_id || !to_id) {
        return res.status(400).json('incorrect form submission');
    }

    // Check if both user_id and to_id in database in users table 
    let userexist1 = await userExists(user_id, con);
    let userexist2 = await userExists(to_id, con);

    if (!userexist1 || !userexist2) {
        return res.status(400).json('user does not exist');
    }

    var sql_insert_new_message = mysql.format("INSERT INTO messages (message, from_id, to_id) VALUES ('" + message + "','" + user_id + "','" + to_id + "')");

    con.query(sql_insert_new_message, function (err, result) {
        if (err) {
            throw err;
        };
        return res.status(200).json('Created Message');
    });


}

const converstationWithUser = async (req, res, con) => {

    const { user_id, to_id } = req.body;

    if (!user_id || !to_id) {
        return res.status(400).json('no user id');
    }

    // check if both users exist in database users table
    let userexist1 = await userExists(user_id, con);
    let userexist2 = await userExists(to_id, con);

    if (!userexist1 || !userexist2) {
        return res.status(400).json('user does not exist');
    }
    // select messages between the two users
    var sql_insert_get_messages = 'SELECT * FROM messages WHERE (to_id = ? AND from_id = ?) OR (to_id = ? AND from_id = ?)';

    con.query(sql_insert_get_messages, [user_id, to_id, to_id, user_id], function (err, result) {
        if (err) {
            throw err;
        };

        if (result.affectedRows == 0) {
            return res.status(200).json('No messages');
        }
        else
            return res.status(200).json(result);
    });

}

const userExists = async (user_id, con) => {

    var sql_user_exists = mysql.format('SELECT * FROM users WHERE id = ?', [user_id]);
    return new Promise(function (resolve, reject) {
        con.query(sql_user_exists, function (err, result) {
            if (err) {
                throw err;
            };
            if (result.length == 1) {
                return resolve(true);
            }
            else {
                return resolve(false);
            }
        });
    })
}


module.exports = {
    sendMessage: sendMessage,
    converstationWithUser: converstationWithUser
};