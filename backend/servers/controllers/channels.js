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

function insertChannels(req, res) {
    let newChannel = req.body;

    let sqlGral = `INSERT INTO datawarehouse.channels(channel_name, channel_username, user_id, preferences) VALUES`

    if (newChannel.whatsapp) {
        let sql = sqlGral + ` ("whatsapp", "${newChannel.whatsapp}", ${newChannel.user_id}, "${newChannel.wpre}")`;
        conectionSql(sql);
    }
    if (newChannel.telefono) {
        let sql = sqlGral + ` ("telefono", "${newChannel.telefono}", ${newChannel.user_id}, "${newChannel.tpre}")`;
        conectionSql(sql);
    }
    if (newChannel.facebook) {
        let sql = sqlGral + ` ("facebook", "${newChannel.facebook}", ${newChannel.user_id}, "${newChannel.fpre}")`;
        conectionSql(sql);
    }
    if (newChannel.linkedin) {
        let sql = sqlGral + ` ("linkedin", "${newChannel.linkedin}", ${newChannel.user_id}, "${newChannel.lpre}")`;
        conectionSql(sql);
    }
    if (newChannel.slack) {
        let sql = sqlGral + ` ("slack", "${newChannel.slack}", ${newChannel.user_id}, "${newChannel.spre}")`;
        conectionSql(sql);
    }

    function conectionSql(sql) {
        connection.query(sql, function (err, channel) {
            if (err) {
                console.log(err)
                res.status(500).json({ error: 'Asegurese de ingresar todos los datos' });
            }
        })
    }
    res.status(201).json({ message: 'Todo salio bien' });

}

module.exports = {
    getChannelsById,
    insertChannels
}