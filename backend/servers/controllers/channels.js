let connection = require('../connection');

function getChannelsById(req, res) {

    let contactId = req.params.id;
    let sql = `SELECT * FROM channels WHERE user_id = ${contactId}`
    connection.query(sql, function (err, channel) {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Asegurese de ingresar todos los datos para actualizar' });

        } else {
            res.send(channel)
        }
    })

}

module.exports = {
    getChannelsById
}