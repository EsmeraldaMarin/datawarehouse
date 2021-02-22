let connection = require('../connection');

function selectUsers(req, res) {

    let sql = `SELECT * FROM users`;

    connection.query(sql, function (err, users) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal error' });

        } else {

            res.send(users)

        }
    })
}
function deleteUser(req, res) {

    let userId = req.params.id;
    let sql = `DELETE FROM users WHERE id = ${userId}`
    connection.query(sql, function (err, user) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Error' });

        } else {
            res.status(200).json({ message: 'user deleted', user })
        }
    })
}

module.exports ={
    selectUsers,
    deleteUser
}