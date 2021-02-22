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
function insertUser(req, res) {
    let newUser = req.body;

    let sql = `INSERT INTO datawarehouse.users(name, lastname, email, is_admin, password)
    VALUES ("${newUser.name}", "${newUser.lastname}", "${newUser.email}", ${newUser.is_admin}, "${newUser.password}");`;

    connection.query(sql, function (err, user) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Asegurese de ingresar todos los datos' });

        } else {
            res.status(201).json(
                {
                    message: 'user created',
                    userId: user.insertId
                }
            )
        }
    })

}

function updateUser(req, res) {

    let update = req.body;
    let userId = req.params.id;
    // let userRol = req.params.rol.is_admin


    let sql = `UPDATE users
        SET name =' ${update.name}',
        lastname = '${update.lastname}',
        email = '${update.email}',
        is_admin= ${update.is_admin},
        password = '${update.password}'
        WHERE id = ${userId}`


    connection.query(sql, function (err, user) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Asegurese de ingresar todos los datos para actualizar' });

        } else {
            res.status(200).json({ message: 'user updated', user })
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

module.exports = {
    selectUsers,
    insertUser,
    updateUser,
    deleteUser
}